import type {
  Frame,
  PlayerSettings,
  PostFrameUpdateEvent,
} from '@slippilab/parser';
import {
  fetchAnimations,
  //isOneIndexed,
  animationNameByActionId,
} from '../animations';
import type { CharacterAnimations } from '../animations';
import { supportedCharactersById } from '../characters';
import { characterNamesById } from '../common';
import type { Character } from '../common';
import type { Render } from '../game';
import type { Layer, Layers } from '../layer';
import {
  isInFrame,
  getFacingDirection,
  getFirstFrameOfAnimation,
  getThrowerName,
  getShade,
} from '../replay';

export const createPlayerRender = async (
  player: PlayerSettings,
  players: PlayerSettings[],
  isDoubles: boolean,
): Promise<Render> => {
  const animations = await fetchAnimations(player.externalCharacterId);
  return (
    layers: Layers,
    frame: Frame,
    frames: Frame[],
    isDarkMode: boolean,
  ) => {
    if (!isInFrame(frame, player)) {
      return;
    }
    renderUi(layers.screenSpace, frame, player, players, isDoubles, isDarkMode);
    renderCharacter(
      layers.worldSpace.context,
      frame,
      frames,
      player,
      players,
      isDoubles,
      isDarkMode,
      animations,
    );
    renderShield(
      layers.worldSpace.context,
      frame,
      player,
      players,
      isDoubles,
      isDarkMode,
    );
    renderShine(layers.worldSpace.context, frame, player);
  };
};
const colors = ['#FB2323', '#2266BB', '#FFDD44', '#66BB22'];
// darks are untested
const teamColors = [
  ['#FB2323', '#FB9999', '#9D0006'],
  ['#2266BB', '#66AAFF', '#876678'],
  ['#66BB22', '#AAFF66', '#79740E'],
];

const getPrimaryColor = (
  player: PlayerSettings,
  players: PlayerSettings[],
  isDoubles: boolean,
): string => {
  // CPU
  if (player.playerType === 1) {
    return 'grey';
  }
  if (isDoubles) {
    return teamColors[player.teamId][getShade(player.playerIndex, players)];
  } else {
    return colors[player.playerIndex];
  }
};

const getSecondaryColor = (
  playerFrame: PostFrameUpdateEvent,
  lCancelStatus: number,
): string => {
  return playerFrame.hurtboxCollisionState > 0
    ? 'blue' // invinc / invuln
    : lCancelStatus === 2
    ? 'red' // missed lcanc
    : 'black';
};

const renderStocks = (
  screenLayer: Layer,
  frame: Frame,
  player: PlayerSettings,
  players: PlayerSettings[],
  isDoubles: boolean,
  isDarkMode: boolean,
): void => {
  // TODO: Handle stock count >4 or non-stock modes
  const playerFrame = frame.players[player.playerIndex].post;
  const stockCount = playerFrame.stocksRemaining;
  screenLayer.context.save();
  screenLayer.context.fillStyle = getPrimaryColor(player, players, isDoubles);
  screenLayer.context.strokeStyle = isDarkMode ? 'white' : 'black';
  for (let stockIndex = 0; stockIndex < stockCount; stockIndex++) {
    const x = ((stockIndex - 2) * screenLayer.canvas.width) / 40;
    const y = 0;
    const radius = screenLayer.canvas.width / 100;
    screenLayer.context.beginPath();
    screenLayer.context.arc(x, y, radius, 0, 2 * Math.PI);
    screenLayer.context.closePath();
    screenLayer.context.fill();
    screenLayer.context.stroke();
  }
  screenLayer.context.restore();
};

const renderPercent = (
  screenLayer: Layer,
  frame: Frame,
  player: PlayerSettings,
  players: PlayerSettings[],
  isDoubles: boolean,
  isDarkMode: boolean,
): void => {
  const playerFrame = frame.players[player.playerIndex].post;
  const characterData = supportedCharactersById[player.externalCharacterId];
  const actionName = animationNameByActionId[playerFrame.actionStateId];
  const animationName =
    characterData.animationMap.get(actionName) ?? actionName;
  if (animationName?.match('Dead')) {
    return;
  }
  const percent = `${Math.floor(playerFrame.percent)}%`;
  screenLayer.context.save();
  const fontSize = screenLayer.canvas.height / 15;
  screenLayer.context.font = `900 ${fontSize}px Arial`;
  screenLayer.context.textAlign = 'center';
  screenLayer.context.strokeStyle = isDarkMode ? 'white' : 'black';
  screenLayer.context.fillStyle = getPrimaryColor(player, players, isDoubles);
  const x = 0;
  const y = -screenLayer.canvas.height / 10;
  screenLayer.context.translate(x, y);
  // flip text back right-side after global flip
  screenLayer.context.scale(1, -1);
  screenLayer.context.fillText(percent, 0, 0);
  screenLayer.context.strokeText(percent, 0, 0);
  screenLayer.context.restore();
};

const renderPlayerDetails = (
  screenLayer: Layer,
  _frame: Frame,
  player: PlayerSettings,
  players: PlayerSettings[],
  isDoubles: boolean,
  isDarkMode: boolean,
): void => {
  // const playerFrame = _frame.players[player.playerIndex].post;
  const character = characterNamesById[player.externalCharacterId];
  screenLayer.context.save();
  const fontSize = screenLayer.canvas.height / 30;
  screenLayer.context.font = `900 ${fontSize}px Verdana`;
  screenLayer.context.textAlign = 'center';
  screenLayer.context.strokeStyle = isDarkMode ? 'white' : 'black';
  screenLayer.context.fillStyle = getPrimaryColor(player, players, isDoubles);
  const x = 0;
  const y = -screenLayer.canvas.height / 7.5;
  screenLayer.context.translate(x, y);
  // flip text back right-side after global flip
  screenLayer.context.scale(1, -1);
  const name = player.displayName?.length
    ? player.displayName
    : player.connectCode?.length
    ? player.connectCode
    : player.nametag?.length
    ? player.nametag
    : player.playerType === 1
    ? 'CPU'
    : character;
  // Debug mode
  // const characterData = supportedCharactersById[player.characterId];
  // let animationName;
  // const actionName = animationNameByActionId[playerFrame.actionStateId];
  // if (characterData.specialsMap.has(playerFrame.actionStateId)) {
  //   animationName = characterData.specialsMap.get(playerFrame.actionStateId);
  // } else if (actionName) {
  //   animationName = characterData.animationMap.get(actionName) ?? actionName;
  // }
  // const name = `${playerFrame.actionStateId},${animationName},${playerFrame.actionStateCounter}`;

  screenLayer.context.fillText(name, 0, 0);
  screenLayer.context.strokeText(name, 0, 0);
  screenLayer.context.restore();
};

const getAnimationFrame = (
  player: PlayerSettings,
  playerFrame: PostFrameUpdateEvent,
  frames: Frame[],
  frame: Frame,
  animations: CharacterAnimations,
  characterData: Character,
  worldContext: CanvasRenderingContext2D,
): string | undefined => {
  const character = characterNamesById[player.externalCharacterId];

  // Determine animation
  let animationName;
  const actionName = animationNameByActionId[playerFrame.actionStateId];
  if (characterData.specialsMap.has(playerFrame.actionStateId)) {
    animationName = characterData.specialsMap.get(playerFrame.actionStateId);
  } else if (actionName) {
    animationName = characterData.animationMap.get(actionName) ?? actionName;
  }
  if (animationName?.match('Thrown')) {
    const direction = animationName.match(/[A-Z][a-z]*$/g);
    const opponent = getThrowerName(player, direction![0], frame);
    animationName = `T${opponent}Throw${direction}`;
  }

  // Determine frame
  const firstIndex =
    playerFrame.actionStateFrameCounter < 0 //||
      ? //isOneIndexed(player.characterId, playerFrame.actionStateId)
        1
      : 0;
  const animationFrames = animationName
    ? animations[animationName] ?? animations['Appeal'] ?? animations['AppealL']
    : animations['Appeal'] ?? animations['AppealL'];
  const animationIndex =
    Math.max(Math.floor(playerFrame.actionStateFrameCounter + firstIndex), 0) %
    animationFrames.length;
  if (!animationName) {
    return;
  }

  // Other work
  const facingDirection = getFacingDirection(
    playerFrame.facingDirection,
    animationName,
    character,
    animationIndex,
  );
  worldContext.scale(facingDirection, 1);
  const isSpacieUpBMovementAction =
    playerFrame.actionStateId === 355 || playerFrame.actionStateId === 356;
  const isDamageFlyRoll = playerFrame.actionStateId === 91;
  if (isSpacieUpBMovementAction || isDamageFlyRoll) {
    // just a guess, especially between different characters..
    const rotationYOffset = 10;
    let referenceFrame = isSpacieUpBMovementAction
      ? getFirstFrameOfAnimation(playerFrame, frames)
      : frames[playerFrame.frameNumber - 1].players[player.playerIndex].post;
    let deltaFrame =
      frames[referenceFrame.frameNumber + 1].players[player.playerIndex].post;
    const xDiff = deltaFrame.xPosition - referenceFrame.xPosition;
    const yDiff = deltaFrame.yPosition - referenceFrame.yPosition;
    const rawAngle = Math.atan2(yDiff, facingDirection * xDiff);
    // Spacie UpB animation default angle is straight right (not counting facingDirection)
    // DamageFlyRoll animation default angle is straight up
    const rotationAmount = rawAngle - (isDamageFlyRoll ? Math.PI / 2 : 0);
    worldContext.translate(0, rotationYOffset);
    worldContext.rotate(rotationAmount);
    worldContext.translate(0, -rotationYOffset);
  }

  const animationString = animationFrames[animationIndex];
  if (animationString?.startsWith('frame')) {
    const referencedFrameIndex = Number(animationString.substr(5));
    return animationFrames[referencedFrameIndex];
  }
  return animationString;
};

const renderCharacter = (
  worldContext: CanvasRenderingContext2D,
  frame: Frame,
  frames: Frame[],
  player: PlayerSettings,
  players: PlayerSettings[],
  isDoubles: boolean,
  isDarkMode: boolean,
  animations: CharacterAnimations,
): void => {
  const playerFrame = frame.players[player.playerIndex].post;
  const characterData = supportedCharactersById[player.externalCharacterId];
  worldContext.save();
  worldContext.lineWidth *= isDarkMode ? 6 : 2;

  const lCancelStatus = getFirstFrameOfAnimation(
    playerFrame,
    frames,
  ).lCancelStatus;
  const primaryColor = getPrimaryColor(player, players, isDoubles);
  const secondaryColor = getSecondaryColor(playerFrame, lCancelStatus);
  worldContext.strokeStyle = isDarkMode ? primaryColor : secondaryColor;
  worldContext.fillStyle = isDarkMode ? secondaryColor : primaryColor;
  worldContext.translate(playerFrame.xPosition, playerFrame.yPosition);
  worldContext.scale(characterData.scale, characterData.scale);
  worldContext.lineWidth /= characterData.scale;
  const animationFrame = getAnimationFrame(
    player,
    playerFrame,
    frames,
    frame,
    animations,
    characterData,
    worldContext,
  );
  if (!animationFrame) {
    worldContext.restore();
    return;
  }
  const path = new Path2D(animationFrame);
  // SVG data is 10x too big, offset by 500, and needs to be flipped
  worldContext.scale(0.1, 0.1);
  worldContext.lineWidth /= 0.1;
  worldContext.translate(-500, 500);
  worldContext.scale(1, -1);
  worldContext.stroke(path);
  worldContext.fill(path);
  worldContext.restore();
};

const renderShield = (
  worldContext: CanvasRenderingContext2D,
  frame: Frame,
  player: PlayerSettings,
  players: PlayerSettings[],
  isDoubles: boolean,
  isDarkMode: boolean,
): void => {
  const playerFrame = frame.players[player.playerIndex].post;
  const characterData = supportedCharactersById[player.externalCharacterId];
  if (playerFrame.actionStateId < 0x0b2 || playerFrame.actionStateId > 0x0b6) {
    return;
  }
  worldContext.save();
  worldContext.globalAlpha = 0.75;
  worldContext.fillStyle = getPrimaryColor(player, players, isDoubles);
  worldContext.strokeStyle = isDarkMode ? 'white' : 'black';
  const shieldHealthPercent = playerFrame.shieldSize / 60;
  worldContext.translate(playerFrame.xPosition, playerFrame.yPosition);
  worldContext.scale(playerFrame.facingDirection, 1);
  worldContext.scale(characterData.scale, characterData.scale);
  worldContext.lineWidth /= characterData.scale;
  worldContext.translate(
    characterData.shieldOffset.x,
    characterData.shieldOffset.y,
  );
  // TODO: Seems to be some constant added because shield break happens before
  // radius 0.
  // Guessing shield size attribute is diameter so divide by 2
  const shieldRadius = (characterData.shieldSize * shieldHealthPercent) / 2;
  worldContext.beginPath();
  worldContext.arc(0, 0, shieldRadius, 0, 2 * Math.PI);
  worldContext.closePath();
  worldContext.fill();
  worldContext.stroke();
  worldContext.restore();
};

const renderShine = (
  worldContext: CanvasRenderingContext2D,
  frame: Frame,
  player: PlayerSettings,
): void => {
  const playerFrame = frame.players[player.playerIndex].post;
  const character = characterNamesById[player.externalCharacterId];
  const characterData = supportedCharactersById[player.externalCharacterId];
  if (
    (character !== 'Fox' && character !== 'Falco') ||
    playerFrame.actionStateId < 360 ||
    playerFrame.actionStateId > 369
  ) {
    return;
  }
  worldContext.save();
  worldContext.strokeStyle = 'deepskyblue';
  worldContext.lineWidth *= 5;

  worldContext.translate(playerFrame.xPosition, playerFrame.yPosition);
  worldContext.scale(playerFrame.facingDirection, 1);
  worldContext.scale(characterData.scale, characterData.scale);
  worldContext.lineWidth /= characterData.scale;
  worldContext.translate(
    characterData.shieldOffset.x,
    characterData.shieldOffset.y,
  );
  // world space --> shine space
  // shine is 0.9 * shield size
  // TODO: spacies have different sized shines
  // not as big as shield because we have linewidth
  const shineScale = (characterData.shieldSize / 2) * 0.9;
  worldContext.scale(shineScale, shineScale);
  worldContext.lineWidth /= shineScale;
  drawHexagon(1, worldContext);
  drawHexagon(0.5, worldContext);
  worldContext.restore();
};

const drawHexagon = (
  radius: number,
  worldContext: CanvasRenderingContext2D,
) => {
  worldContext.beginPath();
  const sixths = (2 * Math.PI) / 6;
  worldContext.moveTo(0, radius);
  for (var hexPart = 0; hexPart < 6; hexPart++) {
    worldContext.lineTo(
      radius * Math.sin(sixths * (hexPart + 1)),
      radius * Math.cos(sixths * (hexPart + 1)),
    );
  }
  worldContext.closePath();
  worldContext.stroke();
};

const renderUi = (
  screenLayer: Layer,
  frame: Frame,
  player: PlayerSettings,
  players: PlayerSettings[],
  isDoubles: boolean,
  isDarkMode: boolean,
): void => {
  screenLayer.context.save();
  const playerUiX = screenLayer.canvas.width * 0.2 * (player.playerIndex + 1);
  const playerUiY = screenLayer.canvas.height / 4;
  screenLayer.context.translate(playerUiX, playerUiY);
  renderStocks(screenLayer, frame, player, players, isDoubles, isDarkMode);
  renderPercent(screenLayer, frame, player, players, isDoubles, isDarkMode);
  renderPlayerDetails(
    screenLayer,
    frame,
    player,
    players,
    isDoubles,
    isDarkMode,
  );
  screenLayer.context.restore();
};
