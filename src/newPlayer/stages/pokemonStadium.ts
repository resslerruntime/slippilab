import { Vector } from '../common';
import type { Stage } from './stage';

export const pokemonStadium: Stage = {
  lines: [
    // ground
    [new Vector(-87.75, 0), new Vector(87.75, 0)],
    // platforms
    [new Vector(-55, 25), new Vector(-25, 25)],
    [new Vector(25, 25), new Vector(55, 25)],
    // ceiling
    [new Vector(-73.75, -17.75), new Vector(-60, -17.75)],
    [new Vector(-60, -38), new Vector(-15, -60)],
    [new Vector(-15, -112), new Vector(15, -112)],
    [new Vector(15, -60), new Vector(60, -38)],
    [new Vector(60, -17.75), new Vector(73.75, -17.75)],
    // wallL
    [new Vector(-87.75, 0), new Vector(-87.75, -4)],
    [new Vector(-87.75, -4), new Vector(-73.75, -15)],
    [new Vector(-73.75, -15), new Vector(-73.75, -17.75)],
    [new Vector(-60, -17.75), new Vector(-60, -38)],
    [new Vector(-15, -60), new Vector(-15, -112)],
    // wallR
    [new Vector(87.75, 0), new Vector(87.75, -4)],
    [new Vector(87.75, -4), new Vector(73.75, -15)],
    [new Vector(73.75, -15), new Vector(73.75, -17.75)],
    [new Vector(60, -17.75), new Vector(60, -38)],
    [new Vector(15, -60), new Vector(15, -112)],
  ],
  scale: 4.2,
  offset: new Vector(600, 500),
};
