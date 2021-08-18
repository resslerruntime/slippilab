export type ActionName = typeof animationNameByActionId[number];
export const animationNameByActionId = [
  'DeadDown', //  0
  'DeadLeft', //  1
  'DeadRight', //  2
  'DeadUp', //  3
  'DeadUpStar', //  4
  'DeadUpStarIce', //  5
  'UNSUPPORTED', //  6
  'UNSUPPORTED', //  7
  'DeadUpFallHitCamera', //  8
  'DeadUpFallIce', //  9
  'DeadUpFallHitCameraIce', //  10
  'Rebirth', //  11
  'Rebirth', //  12
  'RebirthWait', //  13
  'Wait', //  14
  'WalkSlow', //  15
  'WalkMiddle', //  16
  'WalkFast', //  17
  'Turn', //  18
  'TurnRun', //  19
  'Dash', //  20
  'Run', //  21
  'RunDirect', //  22
  'RunBrake', //  23
  'KneeBend', //  24
  'JumpF', //  25
  'JumpB', //  26
  'JumpAerialF', //  27
  'JumpAerialB', //  28
  'Fall', //  29
  'FallF', //  30
  'FallB', //  31
  'FallAerial', //  32
  'FallAerialF', //  33
  'FallAerialB', //  34
  'FallSpecial', //  35
  'FallSpecialF', //  36
  'FallSpecialB', //  37
  'DamageFall', //  38
  'Squat', //  39
  'SquatWait', //  40
  'SquatRv', //  41
  'Landing', //  42
  'LandingFallSpecial', //  43
  'Attack11', //  44
  'Attack12', //  45
  'Attack13', //  46
  'Attack100Start', //  47
  'Attack100Loop', //  48
  'Attack100End', //  49
  'AttackDash', //  50
  'AttackS3Hi', //  51
  'AttackS3HiS', //  52
  'AttackS3S', //  53
  'AttackS3LwS', //  54
  'AttackS3Lw', //  55
  'AttackHi3', //  56
  'AttackLw3', //  57
  'AttackS4Hi', //  58
  'AttackS4HiS', //  59
  'AttackS4S', //  60
  'AttackS4LwS', //  61
  'AttackS4Lw', //  62
  'AttackHi4', //  63
  'AttackLw4', //  64
  'AttackAirN', //  65
  'AttackAirF', //  66
  'AttackAirB', //  67
  'AttackAirHi', //  68
  'AttackAirLw', //  69
  'LandingAirN', //  70
  'LandingAirF', //  71
  'LandingAirB', //  72
  'LandingAirHi', //  73
  'LandingAirLw', //  74
  'DamageHi1', //  75
  'DamageHi2', //  76
  'DamageHi3', //  77
  'DamageN1', //  78
  'DamageN2', //  79
  'DamageN3', //  80
  'DamageLw1', //  81
  'DamageLw2', //  82
  'DamageLw3', //  83
  'DamageAir1', //  84
  'DamageAir2', //  85
  'DamageAir3', //  86
  'DamageFlyHi', //  87
  'DamageFlyN', //  88
  'DamageFlyLw', //  89
  'DamageFlyTop', //  90
  'DamageFlyRoll', //  91
  'LightGet', //  92
  'HeavyGet', //  93
  'LightThrowF', //  94
  'LightThrowB', //  95
  'LightThrowHi', //  96
  'LightThrowLw', //  97
  'LightThrowDash', //  98
  'LightThrowDrop', //  99
  'LightThrowAirF', //  100
  'LightThrowAirB', //  101
  'LightThrowAirHi', //  102
  'LightThrowAirLw', //  103
  'HeavyThrowF', //  104
  'HeavyThrowB', //  105
  'HeavyThrowHi', //  106
  'HeavyThrowLw', //  107
  'LightThrowF4', //  108
  'LightThrowB4', //  109
  'LightThrowHi4', //  110
  'LightThrowLw4', //  111
  'LightThrowAirF4', //  112
  'LightThrowAirB4', //  113
  'LightThrowAirHi4', //  114
  'LightThrowAirLw4', //  115
  'HeavyThrowF4', //  116
  'HeavyThrowB4', //  117
  'HeavyThrowHi4', //  118
  'HeavyThrowLw4', //  119
  'SwordSwing1', //  120
  'SwordSwing3', //  121
  'SwordSwing4', //  122
  'SwordSwingDash', //  123
  'BatSwing1', //  124
  'BatSwing3', //  125
  'BatSwing4', //  126
  'BatSwingDash', //  127
  'ParasolSwing1', //  128
  'ParasolSwing3', //  129
  'ParasolSwing4', //  130
  'ParasolSwingDash', //  131
  'HarisenSwing1', //  132
  'HarisenSwing3', //  133
  'HarisenSwing4', //  134
  'HarisenSwingDash', //  135
  'StarRodSwing1', //  136
  'StarRodSwing3', //  137
  'StarRodSwing4', //  138
  'StarRodSwingDash', //  139
  'LipStickSwing1', //  140
  'LipStickSwing3', //  141
  'LipStickSwing4', //  142
  'LipStickSwingDash', //  143
  'ItemParasolOpen', //  144
  'ItemParasolFall', //  145
  'ItemParasolFallSpecial', //  146
  'ItemParasolDamageFall', //  147
  'LGunShoot', //  148
  'LGunShootAir', //  149
  'LGunShootEmpty', //  150
  'LGunShootAirEmpty', //  151
  'FireFlowerShoot', //  152
  'FireFlowerShootAir', //  153
  'ItemScrew', //  154
  'ItemScrewAir', //  155
  'DamageScrew', //  156
  ' DamageScrewAir', //  157
  'ItemScopeStart', //  158
  'ItemScopeRapid', //  159
  'ItemScopeFire', //  160
  'ItemScopeEnd', //  161
  'ItemScopeAirStart', //  162
  'ItemScopeAirRapid', //  163
  'ItemScopeAirFire', //  164
  'ItemScopeAirEnd', //  165
  'ItemScopeStartEmpty', //  166
  'ItemScopeRapidEmpty', //  167
  'ItemScopeFireEmpty', //  168
  'ItemScopeEndEmpty', //  169
  'ItemScopeAirStartEmpty', //  170
  'ItemScopeAirRapidEmpty', //  171
  'ItemScopeAirFireEmpty', //  172
  'ItemScopeAirEndEmpty', //  173
  'LiftWait', //  174
  'LiftWalk1', //  175
  'LiftWalk2', //  176
  'LiftTurn', //  177
  'GuardOn', //  178
  'Guard', //  179
  'GuardOff', //  180
  'GuardSetOff', //  181
  'GuardReflect', //  182
  'DownBoundU', //  183
  'DownWaitU', //  184
  'DownDamageU', //  185
  'DownStandU', //  186
  'DownAttackU', //  187
  'DownFowardU', //  188
  'DownBackU', //  189
  'DownSpotU', //  190
  'DownBoundD', //  191
  'DownWaitD', //  192
  'DownDamageD', //  193
  'DownStandD', //  194
  'DownAttackD', //  195
  'DownFowardD', //  196
  'DownBackD', //  197
  'DownSpotD', //  198
  'Passive', //  199
  'PassiveStandF', //  200
  'PassiveStandB', //  201
  'PassiveWall', //  202
  'PassiveWallJump', //  203
  'PassiveCeil', //  204
  'ShieldBreakFly', //  205
  'ShieldBreakFall', //  206
  'ShieldBreakDownU', //  207
  'ShieldBreakDownD', //  208
  'ShieldBreakStandU', //  209
  'ShieldBreakStandD', //  210
  'FuraFura', //  211
  'Catch', //  212
  'CatchPull', //  213
  'CatchDash', //  214
  'CatchDashPull', //  215
  'CatchWait', //  216
  'CatchAttack', //  217
  'CatchCut', //  218
  'ThrowF', //  219
  'ThrowB', //  220
  'ThrowHi', //  221
  'ThrowLw', //  222
  'CapturePulledHi', //  223
  'CaptureWaitHi', //  224
  'CaptureDamageHi', //  225
  'CapturePulledLw', //  226
  'CaptureWaitLw', //  227
  'CaptureDamageLw', //  228
  'CaptureCut', //  229
  'CaptureJump', //  230
  'CaptureNeck', //  231
  'CaptureFoot', //  232
  'EscapeF', //  233
  'EscapeB', //  234
  'Escape', //  235
  'EscapeAir', //  236
  'ReboundStop', //  237
  'Rebound', //  238
  'ThrownF', //  239
  'ThrownB', //  240
  'ThrownHi', //  241
  'ThrownLw', //  242
  'ThrownLwWomen', //  243
  'Pass', //  244
  'Ottotto', //  245
  'OttottoWait', //  246
  'FlyReflectWall', //  247
  'FlyReflectCeil', //  248
  'StopWall', //  249
  'StopCeil', //  250
  'MissFoot', //  251
  'CliffCatch', //  252
  'CliffWait', //  253
  'CliffClimbSlow', //  254
  'CliffClimbQuick', //  255
  'CliffAttackSlow', //  256
  'CliffAttackQuick', //  257
  'CliffEscapeSlow', //  258
  'CliffEscapeQuick', //  259
  'CliffJumpSlow1', //  260
  'CliffJumpSlow2', //  261
  'CliffJumpQuick1', //  262
  'CliffJumpQuick2', //  263
  'AppealR', //  264
  'AppealL', //  265
  'ShoulderedWait', //  266
  'ShoulderedWalkSlow', //  267
  'ShoulderedWalkMiddle', //  268
  'ShoulderedWalkFast', //  269
  'ShoulderedTurn', //  270
  'ThrownFF', //  271
  'ThrownFB', //  272
  'ThrownFHi', //  273
  'ThrownFLw', //  274
  'CaptureCaptain', //  275
  'CaptureYoshi', //  276
  'YoshiEgg', //  277
  'CaptureKoopa', //  278
  'CaptureDamageKoopa', //  279
  'CaptureWaitKoopa', //  280
  'ThrownKoopaF', //  281
  'ThrownKoopaB', //  282
  'CaptureKoopaAir', //  283
  'CaptureDamageKoopaAir', //  284
  'CaptureWaitKoopaAir', //  285
  'ThrownKoopaAirF', //  286
  'ThrownKoopaAirB', //  287
  'CaptureKirby', //  288
  'CaptureWaitKirby', //  289
  'ThrownKirbyStar', //  290
  'ThrownCopyStar', //  291
  'ThrownKirby', //  292
  'BarrelWait', //  293
  'Bury', //  294
  'BuryWait', //  295
  'BuryJump', //  296
  'DamageSong', //  297
  'DamageSongWait', //  298
  'DamageSongRv', //  299
  'DamageBind', //  300
  'CaptureMewtwo', //  301
  'CaptureMewtwoAir', //  302
  'ThrownMewtwo', //  303
  'ThrownMewtwoAir', //  304
  'WarpStarJump', //  305
  'WarpStarFall', //  306
  'HammerWait', //  307
  'HammerWalk', //  308
  'HammerTurn', //  309
  'HammerKneeBend', //  310
  'HammerFall', //  311
  'HammerJump', //  312
  'HammerLanding', //  313
  'KinokoGiantStart', //  314
  'KinokoGiantStartAir', //  315
  'KinokoGiantEnd', //  316
  'KinokoGiantEndAir', //  317
  'KinokoSmallStart', //  318
  'KinokoSmallStartAir', //  319
  'KinokoSmallEnd', //  320
  'KinokoSmallEndAir', //  321
  'Entry', //  322
  'EntryStart', //  323
  'EntryEnd', //  324
  'DamageIce', //  325
  'DamageIceJump', //  326
  'CaptureMasterhand', //  327
  'CapturedamageMasterhand', //  328
  'CapturewaitMasterhand', //  329
  'ThrownMasterhand', //  330
  'CaptureKirbyYoshi', //  331
  'KirbyYoshiEgg', //  332
  'CaptureLeadead', //  333
  'CaptureLikelike', //  334
  'DownReflect', //  335
  'CaptureCrazyhand', //  336
  'CapturedamageCrazyhand', //  337
  'CapturewaitCrazyhand', //  338
  'ThrownCrazyhand', //  339
  'BarrelCannonWait', //  340
  'Wait1', //  341
  'Wait2', //  342
  'Wait3', //  343
  'Wait4', //  344
  'WaitItem', //  345
  'SquatWait1', //  346
  'SquatWait2', //  347
  'SquatWaitItem', //  348
  'GuardDamage', //  349
  'EscapeN', //  350
  'AttackS4Hold', //  351
  'HeavyWalk1', //  352
  'HeavyWalk2', //  353
  'ItemHammerWait', //  354
  'ItemHammerMove', //  355
  'ItemBlind', //  356
  'DamageElec', //  357
  'FuraSleepStart', //  358
  'FuraSleepLoop', //  359
  'FuraSleepEnd', //  360
  'WallDamage', //  361
  'CliffWait1', //  362
  'CliffWait2', //  363
  'SlipDown', //  364
  'Slip', //  365
  'SlipTurn', //  366
  'SlipDash', //  367
  'SlipWait', //  368
  'SlipStand', //  369
  'SlipAttack', //  370
  'SlipEscapeF', //  371
  'SlipEscapeB', //  372
  'AppealS', //  373
  'Zitabata', //  374
  'CaptureKoopaHit', //  375
  'ThrownKoopaEndF', //  376
  'ThrownKoopaEndB', //  377
  'CaptureKoopaAirHit', //  378
  'ThrownKoopaAirEndF', //  379
  'ThrownKoopaAirEndB', //  380
  'ThrownKirbyDrinkSShot', //  381
  'ThrownKirbySpitSShot', //  382
] as const;
