// @flow
import type { Step } from '../types';

import { sample, randInt, addMessageDefaults } from '../utils';

import cat_0 from './0.jpg';
import cat_1 from './1.jpg';
import cat_10 from './10.jpg';
import cat_100 from './100.png';
import cat_101 from './101.gif';
import cat_102 from './102.gif';
import cat_103 from './103.gif';
import cat_104 from './104.gif';
import cat_105 from './105.jpg';
import cat_106 from './106.gif';
import cat_107 from './107.jpg';
import cat_108 from './108.jpg';
import cat_109 from './109.jpg';
import cat_11 from './11.jpg';
import cat_110 from './110.gif';
import cat_111 from './111.jpg';
import cat_112 from './112.gif';
import cat_113 from './113.jpg';
import cat_114 from './114.jpg';
import cat_115 from './115.jpg';
import cat_116 from './116.jpg';
import cat_117 from './117.jpg';
import cat_118 from './118.jpg';
import cat_119 from './119.jpg';
import cat_12 from './12.jpg';
import cat_120 from './120.jpg';
import cat_121 from './121.jpg';
import cat_122 from './122.jpg';
import cat_123 from './123.jpg';
import cat_124 from './124.jpg';
import cat_125 from './125.jpg';
import cat_126 from './126.jpg';
import cat_127 from './127.jpg';
import cat_128 from './128.jpg';
import cat_129 from './129.jpg';
import cat_13 from './13.jpg';
import cat_130 from './130.jpg';
import cat_131 from './131.jpg';
import cat_132 from './132.jpg';
import cat_133 from './133.jpg';
import cat_134 from './134.jpg';
import cat_135 from './135.jpg';
import cat_136 from './136.jpg';
import cat_137 from './137.jpg';
import cat_138 from './138.jpg';
import cat_139 from './139.jpg';
import cat_14 from './14.jpg';
import cat_140 from './140.jpg';
import cat_141 from './141.jpg';
import cat_142 from './142.jpg';
import cat_143 from './143.jpg';
import cat_144 from './144.jpg';
import cat_145 from './145.jpg';
import cat_146 from './146.jpg';
import cat_147 from './147.jpg';
import cat_148 from './148.jpg';
import cat_149 from './149.jpg';
import cat_15 from './15.jpg';
import cat_150 from './150.jpg';
import cat_152 from './152.jpg';
import cat_153 from './153.jpg';
import cat_154 from './154.jpg';
import cat_155 from './155.jpg';
import cat_156 from './156.jpg';
import cat_157 from './157.jpg';
import cat_158 from './158.jpg';
import cat_159 from './159.jpg';
import cat_16 from './16.jpg';
import cat_160 from './160.jpg';
import cat_161 from './161.jpg';
import cat_162 from './162.jpg';
import cat_163 from './163.jpg';
import cat_164 from './164.jpg';
import cat_165 from './165.jpg';
import cat_166 from './166.jpg';
import cat_167 from './167.jpg';
import cat_168 from './168.jpg';
import cat_169 from './169.jpg';
import cat_17 from './17.jpg';
import cat_170 from './170.jpg';
import cat_171 from './171.jpg';
import cat_172 from './172.jpg';
import cat_175 from './175.jpg';
import cat_176 from './176.jpg';
import cat_177 from './177.jpg';
import cat_178 from './178.jpg';
import cat_179 from './179.jpg';
import cat_18 from './18.jpg';
import cat_180 from './180.jpg';
import cat_181 from './181.jpg';
import cat_182 from './182.jpg';
import cat_183 from './183.gif';
import cat_184 from './184.jpg';
import cat_185 from './185.jpg';
import cat_186 from './186.jpg';
import cat_187 from './187.jpg';
import cat_188 from './188.jpg';
import cat_189 from './189.jpg';
import cat_19 from './19.jpg';
import cat_190 from './190.jpg';
import cat_191 from './191.jpg';
import cat_192 from './192.jpg';
import cat_193 from './193.jpg';
import cat_194 from './194.jpg';
import cat_195 from './195.jpg';
import cat_196 from './196.jpg';
import cat_198 from './198.jpg';
import cat_199 from './199.jpg';
import cat_2 from './2.jpg';
import cat_20 from './20.jpg';
import cat_200 from './200.jpg';
import cat_201 from './201.jpg';
import cat_202 from './202.jpg';
import cat_203 from './203.jpg';
import cat_204 from './204.jpg';
import cat_205 from './205.jpg';
import cat_206 from './206.gif';
import cat_207 from './207.jpg';
import cat_208 from './208.jpg';
import cat_209 from './209.jpg';
import cat_21 from './21.jpg';
import cat_210 from './210.jpg';
import cat_211 from './211.jpg';
import cat_212 from './212.jpg';
import cat_213 from './213.jpg';
import cat_214 from './214.jpg';
import cat_215 from './215.jpg';
import cat_216 from './216.jpg';
import cat_217 from './217.jpg';
import cat_218 from './218.jpg';
import cat_219 from './219.jpg';
import cat_22 from './22.jpg';
import cat_220 from './220.jpg';
import cat_221 from './221.jpg';
import cat_222 from './222.jpg';
import cat_223 from './223.jpg';
import cat_224 from './224.jpg';
import cat_225 from './225.jpg';
import cat_226 from './226.jpg';
import cat_227 from './227.jpg';
import cat_228 from './228.jpg';
import cat_229 from './229.jpg';
import cat_23 from './23.jpg';
import cat_230 from './230.jpg';
import cat_231 from './231.jpg';
import cat_232 from './232.jpg';
import cat_233 from './233.jpg';
import cat_234 from './234.jpg';
import cat_235 from './235.jpg';
import cat_236 from './236.jpg';
import cat_237 from './237.jpg';
import cat_238 from './238.jpg';
import cat_239 from './239.jpg';
import cat_24 from './24.jpg';
import cat_240 from './240.jpg';
import cat_241 from './241.jpg';
import cat_242 from './242.jpg';
import cat_243 from './243.jpg';
import cat_244 from './244.jpg';
import cat_245 from './245.jpg';
import cat_246 from './246.jpg';
import cat_247 from './247.jpg';
import cat_248 from './248.jpg';
import cat_249 from './249.jpg';
import cat_25 from './25.jpg';
import cat_250 from './250.jpg';
import cat_251 from './251.jpg';
import cat_252 from './252.jpg';
import cat_253 from './253.jpg';
import cat_254 from './254.jpg';
import cat_255 from './255.jpg';
import cat_256 from './256.jpg';
import cat_257 from './257.jpg';
import cat_258 from './258.jpg';
import cat_259 from './259.jpg';
import cat_26 from './26.jpg';
import cat_260 from './260.jpg';
import cat_261 from './261.jpg';
import cat_262 from './262.jpg';
import cat_263 from './263.jpg';
import cat_264 from './264.jpg';
import cat_265 from './265.jpg';
import cat_266 from './266.jpg';
import cat_267 from './267.jpg';
import cat_268 from './268.jpg';
import cat_27 from './27.jpg';
import cat_270 from './270.jpg';
import cat_271 from './271.jpg';
import cat_272 from './272.jpg';
import cat_273 from './273.jpg';
import cat_274 from './274.jpg';
import cat_275 from './275.jpg';
import cat_276 from './276.jpg';
import cat_277 from './277.jpg';
import cat_278 from './278.jpg';
import cat_279 from './279.jpg';
import cat_280 from './280.jpg';
import cat_281 from './281.jpg';
import cat_282 from './282.jpg';
import cat_283 from './283.jpg';
import cat_284 from './284.jpg';
import cat_285 from './285.jpg';
import cat_286 from './286.jpg';
import cat_287 from './287.jpg';
import cat_288 from './288.jpg';
import cat_289 from './289.jpg';
import cat_29 from './29.jpg';
import cat_290 from './290.jpg';
import cat_291 from './291.jpg';
import cat_292 from './292.jpg';
import cat_293 from './293.jpg';
import cat_294 from './294.jpg';
import cat_296 from './296.jpg';
import cat_297 from './297.jpg';
import cat_298 from './298.jpg';
import cat_299 from './299.jpg';
import cat_3 from './3.jpg';
import cat_30 from './30.jpg';
import cat_300 from './300.jpg';
import cat_301 from './301.jpg';
import cat_302 from './302.jpg';
import cat_303 from './303.jpg';
import cat_304 from './304.jpg';
import cat_305 from './305.jpg';
import cat_306 from './306.jpg';
import cat_307 from './307.jpg';
import cat_308 from './308.jpg';
import cat_309 from './309.jpg';
import cat_31 from './31.jpg';
import cat_310 from './310.jpg';
import cat_311 from './311.jpg';
import cat_312 from './312.jpg';
import cat_313 from './313.jpg';
import cat_314 from './314.jpg';
import cat_315 from './315.jpg';
import cat_316 from './316.jpg';
import cat_317 from './317.jpg';
import cat_318 from './318.jpg';
import cat_319 from './319.jpg';
import cat_32 from './32.jpg';
import cat_320 from './320.jpg';
import cat_321 from './321.jpg';
import cat_322 from './322.jpg';
import cat_323 from './323.jpg';
import cat_324 from './324.png';
import cat_325 from './325.jpg';
import cat_326 from './326.jpg';
import cat_327 from './327.jpg';
import cat_328 from './328.jpg';
import cat_329 from './329.jpg';
import cat_33 from './33.png';
import cat_330 from './330.jpg';
import cat_331 from './331.jpg';
import cat_332 from './332.jpg';
import cat_333 from './333.jpg';
import cat_334 from './334.jpg';
import cat_335 from './335.jpg';
import cat_336 from './336.jpg';
import cat_337 from './337.jpg';
import cat_338 from './338.jpg';
import cat_339 from './339.jpg';
import cat_34 from './34.jpg';
import cat_340 from './340.jpg';
import cat_341 from './341.jpg';
import cat_342 from './342.jpg';
import cat_343 from './343.jpg';
import cat_346 from './346.jpg';
import cat_347 from './347.jpg';
import cat_348 from './348.jpg';
import cat_349 from './349.jpg';
import cat_35 from './35.jpg';
import cat_350 from './350.jpg';
import cat_351 from './351.jpg';
import cat_352 from './352.jpg';
import cat_353 from './353.jpg';
import cat_354 from './354.jpg';
import cat_355 from './355.jpg';
import cat_356 from './356.jpg';
import cat_357 from './357.jpg';
import cat_358 from './358.jpg';
import cat_359 from './359.jpg';
import cat_36 from './36.jpg';
import cat_360 from './360.jpg';
import cat_361 from './361.jpg';
import cat_362 from './362.jpg';
import cat_363 from './363.jpg';
import cat_364 from './364.jpg';
import cat_365 from './365.jpg';
import cat_367 from './367.jpg';
import cat_368 from './368.jpg';
import cat_369 from './369.gif';
import cat_37 from './37.jpg';
import cat_371 from './371.gif';
import cat_372 from './372.jpg';
import cat_373 from './373.gif';
import cat_374 from './374.gif';
import cat_375 from './375.gif';
import cat_376 from './376.gif';
import cat_378 from './378.gif';
import cat_379 from './379.gif';
import cat_38 from './38.jpg';
import cat_380 from './380.gif';
import cat_381 from './381.gif';
import cat_382 from './382.gif';
import cat_383 from './383.gif';
import cat_384 from './384.gif';
import cat_385 from './385.jpg';
import cat_386 from './386.jpg';
import cat_387 from './387.jpg';
import cat_388 from './388.jpg';
import cat_389 from './389.jpg';
import cat_39 from './39.jpg';
import cat_390 from './390.jpg';
import cat_391 from './391.jpg';
import cat_392 from './392.jpg';
import cat_393 from './393.jpg';
import cat_394 from './394.jpg';
import cat_395 from './395.jpg';
import cat_396 from './396.jpg';
import cat_397 from './397.jpg';
import cat_398 from './398.jpg';
import cat_399 from './399.jpg';
import cat_4 from './4.jpg';
import cat_40 from './40.jpg';
import cat_400 from './400.jpg';
import cat_401 from './401.jpg';
import cat_402 from './402.jpg';
import cat_403 from './403.jpg';
import cat_405 from './405.jpg';
import cat_406 from './406.jpg';
import cat_407 from './407.jpg';
import cat_408 from './408.jpg';
import cat_409 from './409.jpg';
import cat_41 from './41.jpg';
import cat_410 from './410.png';
import cat_411 from './411.jpg';
import cat_412 from './412.jpg';
import cat_413 from './413.jpg';
import cat_414 from './414.jpg';
import cat_416 from './416.jpg';
import cat_417 from './417.jpg';
import cat_418 from './418.jpg';
import cat_419 from './419.jpg';
import cat_42 from './42.jpg';
import cat_420 from './420.jpg';
import cat_421 from './421.jpg';
import cat_422 from './422.jpg';
import cat_423 from './423.jpg';
import cat_424 from './424.jpg';
import cat_425 from './425.jpg';
import cat_426 from './426.jpg';
import cat_427 from './427.jpg';
import cat_428 from './428.jpg';
import cat_429 from './429.jpg';
import cat_43 from './43.jpg';
import cat_430 from './430.jpg';
import cat_431 from './431.jpg';
import cat_432 from './432.jpg';
import cat_433 from './433.jpg';
import cat_434 from './434.jpg';
import cat_435 from './435.jpg';
import cat_436 from './436.jpg';
import cat_437 from './437.jpg';
import cat_438 from './438.jpg';
import cat_439 from './439.jpg';
import cat_44 from './44.jpg';
import cat_440 from './440.jpg';
import cat_441 from './441.jpg';
import cat_442 from './442.jpg';
import cat_443 from './443.jpg';
import cat_444 from './444.jpg';
import cat_445 from './445.jpg';
import cat_446 from './446.jpg';
import cat_447 from './447.jpg';
import cat_448 from './448.jpg';
import cat_449 from './449.jpg';
import cat_45 from './45.jpg';
import cat_450 from './450.jpg';
import cat_451 from './451.jpg';
import cat_452 from './452.jpg';
import cat_453 from './453.png';
import cat_454 from './454.jpg';
import cat_455 from './455.jpg';
import cat_457 from './457.jpg';
import cat_458 from './458.jpg';
import cat_459 from './459.jpg';
import cat_46 from './46.jpg';
import cat_460 from './460.jpg';
import cat_461 from './461.jpg';
import cat_462 from './462.jpg';
import cat_463 from './463.jpg';
import cat_464 from './464.jpg';
import cat_465 from './465.jpg';
import cat_466 from './466.jpg';
import cat_467 from './467.jpg';
import cat_468 from './468.jpg';
import cat_469 from './469.jpg';
import cat_47 from './47.jpg';
import cat_470 from './470.jpg';
import cat_471 from './471.jpg';
import cat_472 from './472.jpg';
import cat_473 from './473.jpg';
import cat_474 from './474.jpg';
import cat_475 from './475.jpg';
import cat_476 from './476.jpg';
import cat_477 from './477.jpg';
import cat_478 from './478.jpg';
import cat_479 from './479.jpg';
import cat_48 from './48.jpg';
import cat_480 from './480.jpg';
import cat_481 from './481.jpg';
import cat_482 from './482.jpg';
import cat_483 from './483.jpg';
import cat_484 from './484.jpg';
import cat_485 from './485.jpg';
import cat_486 from './486.jpg';
import cat_487 from './487.jpg';
import cat_488 from './488.jpg';
import cat_489 from './489.jpg';
import cat_49 from './49.jpg';
import cat_490 from './490.jpg';
import cat_491 from './491.jpg';
import cat_492 from './492.jpg';
import cat_493 from './493.jpg';
import cat_494 from './494.jpg';
import cat_495 from './495.jpg';
import cat_496 from './496.jpg';
import cat_497 from './497.jpg';
import cat_498 from './498.jpg';
import cat_499 from './499.jpg';
import cat_5 from './5.jpg';
import cat_50 from './50.jpg';
import cat_500 from './500.jpg';
import cat_501 from './501.jpg';
import cat_502 from './502.jpg';
import cat_503 from './503.jpg';
import cat_504 from './504.jpg';
import cat_505 from './505.jpg';
import cat_506 from './506.jpg';
import cat_507 from './507.jpg';
import cat_508 from './508.png';
import cat_509 from './509.jpg';
import cat_51 from './51.jpg';
import cat_510 from './510.jpg';
import cat_511 from './511.jpg';
import cat_512 from './512.jpg';
import cat_513 from './513.jpg';
import cat_514 from './514.jpg';
import cat_515 from './515.jpg';
import cat_516 from './516.jpg';
import cat_517 from './517.jpg';
import cat_518 from './518.jpg';
import cat_519 from './519.jpg';
import cat_52 from './52.jpg';
import cat_520 from './520.jpg';
import cat_521 from './521.jpg';
import cat_522 from './522.jpg';
import cat_523 from './523.jpg';
import cat_524 from './524.jpg';
import cat_525 from './525.jpg';
import cat_526 from './526.jpg';
import cat_527 from './527.jpg';
import cat_53 from './53.jpg';
import cat_530 from './530.jpg';
import cat_532 from './532.jpg';
import cat_533 from './533.jpg';
import cat_534 from './534.jpg';
import cat_535 from './535.jpg';
import cat_536 from './536.jpg';
import cat_537 from './537.jpg';
import cat_538 from './538.jpg';
import cat_539 from './539.jpg';
import cat_54 from './54.jpg';
import cat_540 from './540.jpg';
import cat_541 from './541.jpg';
import cat_542 from './542.jpg';
import cat_543 from './543.jpg';
import cat_544 from './544.jpg';
import cat_545 from './545.jpg';
import cat_546 from './546.jpg';
import cat_547 from './547.jpg';
import cat_548 from './548.jpg';
import cat_549 from './549.jpg';
import cat_55 from './55.jpg';
import cat_550 from './550.gif';
import cat_551 from './551.gif';
import cat_552 from './552.gif';
import cat_553 from './553.gif';
import cat_554 from './554.gif';
import cat_555 from './555.jpg';
import cat_556 from './556.gif';
import cat_557 from './557.gif';
import cat_558 from './558.gif';
import cat_559 from './559.gif';
import cat_56 from './56.jpg';
import cat_560 from './560.jpg';
import cat_561 from './561.gif';
import cat_562 from './562.gif';
import cat_563 from './563.gif';
import cat_564 from './564.jpg';
import cat_565 from './565.jpg';
import cat_566 from './566.jpg';
import cat_567 from './567.jpg';
import cat_568 from './568.jpg';
import cat_569 from './569.jpg';
import cat_57 from './57.jpg';
import cat_570 from './570.png';
import cat_571 from './571.jpg';
import cat_572 from './572.jpg';
import cat_573 from './573.jpg';
import cat_574 from './574.jpg';
import cat_575 from './575.jpg';
import cat_576 from './576.jpg';
import cat_577 from './577.jpg';
import cat_578 from './578.jpg';
import cat_579 from './579.jpg';
import cat_58 from './58.jpg';
import cat_580 from './580.jpg';
import cat_581 from './581.jpg';
import cat_582 from './582.jpg';
import cat_583 from './583.jpg';
import cat_584 from './584.jpg';
import cat_585 from './585.jpg';
import cat_586 from './586.jpg';
import cat_587 from './587.jpg';
import cat_588 from './588.jpg';
import cat_59 from './59.jpg';
import cat_590 from './590.jpg';
import cat_591 from './591.jpg';
import cat_592 from './592.jpg';
import cat_593 from './593.jpg';
import cat_594 from './594.jpg';
import cat_595 from './595.jpg';
import cat_596 from './596.jpg';
import cat_597 from './597.jpg';
import cat_598 from './598.jpg';
import cat_599 from './599.jpg';
import cat_6 from './6.jpg';
import cat_60 from './60.jpg';
import cat_600 from './600.jpg';
import cat_601 from './601.jpg';
import cat_602 from './602.jpg';
import cat_603 from './603.png';
import cat_604 from './604.jpg';
import cat_605 from './605.jpg';
import cat_606 from './606.jpg';
import cat_607 from './607.jpg';
import cat_608 from './608.jpg';
import cat_609 from './609.jpg';
import cat_61 from './61.jpg';
import cat_610 from './610.jpg';
import cat_611 from './611.jpg';
import cat_612 from './612.jpg';
import cat_613 from './613.jpg';
import cat_614 from './614.jpg';
import cat_615 from './615.jpg';
import cat_616 from './616.jpg';
import cat_617 from './617.jpg';
import cat_618 from './618.jpg';
import cat_619 from './619.jpg';
import cat_62 from './62.png';
import cat_620 from './620.jpg';
import cat_621 from './621.jpg';
import cat_622 from './622.jpg';
import cat_623 from './623.jpg';
import cat_624 from './624.jpg';
import cat_625 from './625.jpg';
import cat_626 from './626.jpg';
import cat_627 from './627.jpg';
import cat_628 from './628.jpg';
import cat_629 from './629.jpg';
import cat_63 from './63.jpg';
import cat_630 from './630.jpg';
import cat_631 from './631.jpg';
import cat_632 from './632.jpg';
import cat_633 from './633.jpg';
import cat_634 from './634.jpg';
import cat_635 from './635.jpg';
import cat_636 from './636.jpg';
import cat_637 from './637.jpg';
import cat_638 from './638.jpg';
import cat_639 from './639.jpg';
import cat_64 from './64.png';
import cat_640 from './640.jpg';
import cat_641 from './641.jpg';
import cat_642 from './642.jpg';
import cat_643 from './643.jpg';
import cat_644 from './644.jpg';
import cat_645 from './645.jpg';
import cat_646 from './646.jpg';
import cat_647 from './647.jpg';
import cat_648 from './648.jpg';
import cat_649 from './649.jpg';
import cat_65 from './65.jpg';
import cat_650 from './650.jpg';
import cat_651 from './651.jpg';
import cat_652 from './652.jpg';
import cat_653 from './653.jpg';
import cat_654 from './654.jpg';
import cat_655 from './655.jpg';
import cat_656 from './656.gif';
import cat_657 from './657.jpg';
import cat_658 from './658.jpg';
import cat_659 from './659.gif';
import cat_66 from './66.jpg';
import cat_660 from './660.gif';
import cat_661 from './661.jpg';
import cat_662 from './662.gif';
import cat_663 from './663.gif';
import cat_664 from './664.jpg';
import cat_665 from './665.gif';
import cat_666 from './666.gif';
import cat_667 from './667.gif';
import cat_668 from './668.jpg';
import cat_669 from './669.gif';
import cat_67 from './67.jpg';
import cat_670 from './670.gif';
import cat_671 from './671.jpg';
import cat_672 from './672.jpg';
import cat_673 from './673.jpg';
import cat_674 from './674.gif';
import cat_675 from './675.jpg';
import cat_676 from './676.jpg';
import cat_677 from './677.jpg';
import cat_678 from './678.jpg';
import cat_679 from './679.jpg';
import cat_68 from './68.jpg';
import cat_680 from './680.gif';
import cat_681 from './681.jpg';
import cat_682 from './682.jpg';
import cat_683 from './683.jpg';
import cat_684 from './684.jpg';
import cat_685 from './685.jpg';
import cat_686 from './686.jpg';
import cat_687 from './687.jpg';
import cat_688 from './688.jpg';
import cat_689 from './689.jpg';
import cat_69 from './69.jpg';
import cat_690 from './690.jpg';
import cat_691 from './691.jpg';
import cat_692 from './692.jpg';
import cat_693 from './693.jpg';
import cat_696 from './696.jpg';
import cat_697 from './697.jpg';
import cat_698 from './698.jpg';
import cat_699 from './699.jpg';
import cat_7 from './7.jpg';
import cat_70 from './70.jpg';
import cat_700 from './700.jpg';
import cat_702 from './702.jpg';
import cat_704 from './704.jpg';
import cat_705 from './705.jpg';
import cat_706 from './706.jpg';
import cat_707 from './707.jpg';
import cat_708 from './708.jpg';
import cat_709 from './709.jpg';
import cat_71 from './71.jpg';
import cat_710 from './710.jpg';
import cat_711 from './711.jpg';
import cat_712 from './712.jpg';
import cat_713 from './713.jpg';
import cat_714 from './714.jpg';
import cat_715 from './715.jpg';
import cat_716 from './716.jpg';
import cat_717 from './717.jpg';
import cat_718 from './718.png';
import cat_719 from './719.jpg';
import cat_72 from './72.jpg';
import cat_720 from './720.jpg';
import cat_721 from './721.jpg';
import cat_722 from './722.jpg';
import cat_723 from './723.jpg';
import cat_724 from './724.gif';
import cat_725 from './725.jpg';
import cat_726 from './726.jpg';
import cat_728 from './728.jpg';
import cat_729 from './729.jpg';
import cat_73 from './73.jpg';
import cat_730 from './730.jpg';
import cat_731 from './731.jpg';
import cat_732 from './732.jpg';
import cat_733 from './733.jpg';
import cat_734 from './734.jpg';
import cat_735 from './735.jpg';
import cat_736 from './736.jpg';
import cat_737 from './737.jpg';
import cat_738 from './738.jpg';
import cat_739 from './739.jpg';
import cat_74 from './74.jpg';
import cat_740 from './740.jpg';
import cat_741 from './741.jpg';
import cat_742 from './742.jpg';
import cat_743 from './743.jpg';
import cat_744 from './744.jpg';
import cat_745 from './745.jpg';
import cat_746 from './746.jpg';
import cat_747 from './747.jpg';
import cat_748 from './748.jpg';
import cat_749 from './749.jpg';
import cat_750 from './750.jpg';
import cat_751 from './751.jpg';
import cat_752 from './752.jpg';
import cat_753 from './753.jpg';
import cat_754 from './754.jpg';
import cat_755 from './755.jpg';
import cat_756 from './756.jpg';
import cat_757 from './757.jpg';
import cat_758 from './758.jpg';
import cat_759 from './759.jpg';
import cat_76 from './76.jpg';
import cat_760 from './760.jpg';
import cat_761 from './761.jpg';
import cat_762 from './762.jpg';
import cat_763 from './763.jpg';
import cat_764 from './764.png';
import cat_765 from './765.gif';
import cat_766 from './766.jpg';
import cat_767 from './767.jpg';
import cat_768 from './768.jpg';
import cat_769 from './769.jpg';
import cat_77 from './77.jpg';
import cat_770 from './770.jpg';
import cat_771 from './771.jpg';
import cat_772 from './772.jpg';
import cat_773 from './773.gif';
import cat_774 from './774.jpg';
import cat_775 from './775.jpg';
import cat_776 from './776.jpg';
import cat_777 from './777.jpg';
import cat_778 from './778.jpg';
import cat_779 from './779.jpg';
import cat_78 from './78.jpg';
import cat_781 from './781.jpg';
import cat_782 from './782.jpg';
import cat_783 from './783.jpg';
import cat_784 from './784.jpg';
import cat_785 from './785.jpg';
import cat_786 from './786.jpg';
import cat_787 from './787.jpg';
import cat_788 from './788.jpg';
import cat_789 from './789.jpg';
import cat_79 from './79.jpg';
import cat_790 from './790.jpg';
import cat_791 from './791.jpg';
import cat_792 from './792.jpg';
import cat_793 from './793.jpg';
import cat_794 from './794.jpg';
import cat_795 from './795.jpg';
import cat_796 from './796.jpg';
import cat_797 from './797.jpg';
import cat_798 from './798.jpg';
import cat_799 from './799.jpg';
import cat_8 from './8.jpg';
import cat_80 from './80.jpg';
import cat_800 from './800.jpg';
import cat_801 from './801.jpg';
import cat_802 from './802.png';
import cat_803 from './803.jpg';
import cat_804 from './804.jpg';
import cat_805 from './805.jpg';
import cat_806 from './806.jpg';
import cat_807 from './807.jpg';
import cat_808 from './808.jpg';
import cat_809 from './809.gif';
import cat_81 from './81.jpg';
import cat_810 from './810.gif';
import cat_811 from './811.gif';
import cat_812 from './812.gif';
import cat_813 from './813.gif';
import cat_814 from './814.gif';
import cat_815 from './815.gif';
import cat_816 from './816.gif';
import cat_817 from './817.gif';
import cat_818 from './818.gif';
import cat_819 from './819.gif';
import cat_82 from './82.jpg';
import cat_820 from './820.gif';
import cat_821 from './821.jpg';
import cat_822 from './822.jpg';
import cat_824 from './824.jpg';
import cat_825 from './825.jpg';
import cat_826 from './826.jpg';
import cat_827 from './827.jpg';
import cat_828 from './828.jpg';
import cat_829 from './829.jpg';
import cat_83 from './83.jpg';
import cat_831 from './831.jpg';
import cat_832 from './832.jpg';
import cat_833 from './833.jpg';
import cat_834 from './834.jpg';
import cat_835 from './835.jpg';
import cat_836 from './836.jpg';
import cat_837 from './837.jpg';
import cat_838 from './838.jpg';
import cat_839 from './839.jpg';
import cat_84 from './84.jpg';
import cat_840 from './840.jpg';
import cat_841 from './841.jpg';
import cat_842 from './842.jpg';
import cat_843 from './843.jpg';
import cat_844 from './844.jpg';
import cat_845 from './845.jpg';
import cat_846 from './846.jpg';
import cat_847 from './847.jpg';
import cat_848 from './848.jpg';
import cat_849 from './849.jpg';
import cat_85 from './85.jpg';
import cat_850 from './850.jpg';
import cat_851 from './851.jpg';
import cat_852 from './852.jpg';
import cat_853 from './853.jpg';
import cat_855 from './855.jpg';
import cat_856 from './856.jpg';
import cat_857 from './857.jpg';
import cat_858 from './858.jpg';
import cat_859 from './859.jpg';
import cat_86 from './86.jpg';
import cat_860 from './860.jpg';
import cat_861 from './861.jpg';
import cat_862 from './862.jpg';
import cat_863 from './863.jpg';
import cat_864 from './864.jpg';
import cat_865 from './865.jpg';
import cat_866 from './866.jpg';
import cat_867 from './867.jpg';
import cat_868 from './868.jpg';
import cat_869 from './869.jpg';
import cat_87 from './87.jpg';
import cat_870 from './870.jpg';
import cat_871 from './871.jpg';
import cat_872 from './872.jpg';
import cat_873 from './873.jpg';
import cat_874 from './874.jpg';
import cat_875 from './875.jpg';
import cat_876 from './876.jpg';
import cat_877 from './877.jpg';
import cat_878 from './878.jpg';
import cat_879 from './879.jpg';
import cat_88 from './88.jpg';
import cat_880 from './880.jpg';
import cat_881 from './881.jpg';
import cat_882 from './882.jpg';
import cat_883 from './883.jpg';
import cat_884 from './884.jpg';
import cat_885 from './885.jpg';
import cat_886 from './886.jpg';
import cat_887 from './887.jpg';
import cat_888 from './888.jpg';
import cat_889 from './889.jpg';
import cat_89 from './89.jpg';
import cat_890 from './890.jpg';
import cat_891 from './891.jpg';
import cat_892 from './892.jpg';
import cat_893 from './893.jpg';
import cat_894 from './894.jpg';
import cat_895 from './895.jpg';
import cat_896 from './896.jpg';
import cat_897 from './897.jpg';
import cat_898 from './898.jpg';
import cat_899 from './899.jpg';
import cat_9 from './9.jpg';
import cat_90 from './90.jpg';
import cat_900 from './900.jpg';
import cat_901 from './901.jpg';
import cat_902 from './902.jpg';
import cat_903 from './903.jpg';
import cat_904 from './904.jpg';
import cat_905 from './905.jpg';
import cat_906 from './906.jpg';
import cat_907 from './907.jpg';
import cat_908 from './908.jpg';
import cat_909 from './909.jpg';
import cat_91 from './91.jpg';
import cat_910 from './910.jpg';
import cat_911 from './911.jpg';
import cat_912 from './912.jpg';
import cat_913 from './913.jpg';
import cat_914 from './914.jpg';
import cat_915 from './915.jpg';
import cat_916 from './916.jpg';
import cat_917 from './917.jpg';
import cat_918 from './918.jpg';
import cat_919 from './919.jpg';
import cat_92 from './92.jpg';
import cat_920 from './920.jpg';
import cat_921 from './921.jpg';
import cat_922 from './922.jpg';
import cat_923 from './923.jpg';
import cat_924 from './924.jpg';
import cat_925 from './925.jpg';
import cat_926 from './926.jpg';
import cat_927 from './927.jpg';
import cat_928 from './928.jpg';
import cat_929 from './929.jpg';
import cat_93 from './93.jpg';
import cat_930 from './930.jpg';
import cat_931 from './931.jpg';
import cat_932 from './932.jpg';
import cat_933 from './933.jpg';
import cat_934 from './934.jpg';
import cat_935 from './935.jpg';
import cat_936 from './936.jpg';
import cat_937 from './937.jpg';
import cat_938 from './938.jpg';
import cat_939 from './939.jpg';
import cat_94 from './94.jpg';
import cat_940 from './940.jpg';
import cat_941 from './941.jpg';
import cat_942 from './942.jpg';
import cat_943 from './943.jpg';
import cat_944 from './944.jpg';
import cat_945 from './945.jpg';
import cat_946 from './946.jpg';
import cat_947 from './947.jpg';
import cat_948 from './948.jpg';
import cat_949 from './949.jpg';
import cat_95 from './95.jpg';
import cat_950 from './950.jpg';
import cat_951 from './951.jpg';
import cat_952 from './952.jpg';
import cat_953 from './953.jpg';
import cat_954 from './954.jpg';
import cat_955 from './955.jpg';
import cat_956 from './956.jpg';
import cat_957 from './957.jpg';
import cat_958 from './958.jpg';
import cat_959 from './959.jpg';
import cat_96 from './96.jpg';
import cat_960 from './960.jpg';
import cat_961 from './961.jpg';
import cat_962 from './962.jpg';
import cat_963 from './963.jpg';
import cat_964 from './964.jpg';
import cat_965 from './965.jpg';
import cat_966 from './966.jpg';
import cat_967 from './967.jpg';
import cat_968 from './968.jpg';
import cat_969 from './969.jpg';
import cat_97 from './97.gif';
import cat_970 from './970.jpg';
import cat_972 from './972.jpg';
import cat_973 from './973.jpg';
import cat_974 from './974.jpg';
import cat_975 from './975.jpg';
import cat_976 from './976.jpg';
import cat_977 from './977.jpg';
import cat_978 from './978.jpg';
import cat_979 from './979.jpg';
import cat_98 from './98.gif';
import cat_980 from './980.jpg';
import cat_981 from './981.gif';
import cat_982 from './982.jpg';
import cat_983 from './983.jpg';
import cat_984 from './984.jpg';
import cat_985 from './985.jpg';
import cat_986 from './986.jpg';
import cat_987 from './987.jpg';
import cat_988 from './988.jpg';
import cat_99 from './99.gif';
import cat_990 from './990.jpg';
import cat_991 from './991.jpg';
import cat_992 from './992.jpg';
import cat_993 from './993.png';
import cat_994 from './994.jpg';
import cat_995 from './995.jpg';
import cat_996 from './996.jpg';
import cat_997 from './997.jpg';

const catUrls = [
    cat_0,
    cat_1,
    cat_10,
    cat_100,
    cat_101,
    cat_102,
    cat_103,
    cat_104,
    cat_105,
    cat_106,
    cat_107,
    cat_108,
    cat_109,
    cat_11,
    cat_110,
    cat_111,
    cat_112,
    cat_113,
    cat_114,
    cat_115,
    cat_116,
    cat_117,
    cat_118,
    cat_119,
    cat_12,
    cat_120,
    cat_121,
    cat_122,
    cat_123,
    cat_124,
    cat_125,
    cat_126,
    cat_127,
    cat_128,
    cat_129,
    cat_13,
    cat_130,
    cat_131,
    cat_132,
    cat_133,
    cat_134,
    cat_135,
    cat_136,
    cat_137,
    cat_138,
    cat_139,
    cat_14,
    cat_140,
    cat_141,
    cat_142,
    cat_143,
    cat_144,
    cat_145,
    cat_146,
    cat_147,
    cat_148,
    cat_149,
    cat_15,
    cat_150,
    cat_152,
    cat_153,
    cat_154,
    cat_155,
    cat_156,
    cat_157,
    cat_158,
    cat_159,
    cat_16,
    cat_160,
    cat_161,
    cat_162,
    cat_163,
    cat_164,
    cat_165,
    cat_166,
    cat_167,
    cat_168,
    cat_169,
    cat_17,
    cat_170,
    cat_171,
    cat_172,
    cat_175,
    cat_176,
    cat_177,
    cat_178,
    cat_179,
    cat_18,
    cat_180,
    cat_181,
    cat_182,
    cat_183,
    cat_184,
    cat_185,
    cat_186,
    cat_187,
    cat_188,
    cat_189,
    cat_19,
    cat_190,
    cat_191,
    cat_192,
    cat_193,
    cat_194,
    cat_195,
    cat_196,
    cat_198,
    cat_199,
    cat_2,
    cat_20,
    cat_200,
    cat_201,
    cat_202,
    cat_203,
    cat_204,
    cat_205,
    cat_206,
    cat_207,
    cat_208,
    cat_209,
    cat_21,
    cat_210,
    cat_211,
    cat_212,
    cat_213,
    cat_214,
    cat_215,
    cat_216,
    cat_217,
    cat_218,
    cat_219,
    cat_22,
    cat_220,
    cat_221,
    cat_222,
    cat_223,
    cat_224,
    cat_225,
    cat_226,
    cat_227,
    cat_228,
    cat_229,
    cat_23,
    cat_230,
    cat_231,
    cat_232,
    cat_233,
    cat_234,
    cat_235,
    cat_236,
    cat_237,
    cat_238,
    cat_239,
    cat_24,
    cat_240,
    cat_241,
    cat_242,
    cat_243,
    cat_244,
    cat_245,
    cat_246,
    cat_247,
    cat_248,
    cat_249,
    cat_25,
    cat_250,
    cat_251,
    cat_252,
    cat_253,
    cat_254,
    cat_255,
    cat_256,
    cat_257,
    cat_258,
    cat_259,
    cat_26,
    cat_260,
    cat_261,
    cat_262,
    cat_263,
    cat_264,
    cat_265,
    cat_266,
    cat_267,
    cat_268,
    cat_27,
    cat_270,
    cat_271,
    cat_272,
    cat_273,
    cat_274,
    cat_275,
    cat_276,
    cat_277,
    cat_278,
    cat_279,
    cat_280,
    cat_281,
    cat_282,
    cat_283,
    cat_284,
    cat_285,
    cat_286,
    cat_287,
    cat_288,
    cat_289,
    cat_29,
    cat_290,
    cat_291,
    cat_292,
    cat_293,
    cat_294,
    cat_296,
    cat_297,
    cat_298,
    cat_299,
    cat_3,
    cat_30,
    cat_300,
    cat_301,
    cat_302,
    cat_303,
    cat_304,
    cat_305,
    cat_306,
    cat_307,
    cat_308,
    cat_309,
    cat_31,
    cat_310,
    cat_311,
    cat_312,
    cat_313,
    cat_314,
    cat_315,
    cat_316,
    cat_317,
    cat_318,
    cat_319,
    cat_32,
    cat_320,
    cat_321,
    cat_322,
    cat_323,
    cat_324,
    cat_325,
    cat_326,
    cat_327,
    cat_328,
    cat_329,
    cat_33,
    cat_330,
    cat_331,
    cat_332,
    cat_333,
    cat_334,
    cat_335,
    cat_336,
    cat_337,
    cat_338,
    cat_339,
    cat_34,
    cat_340,
    cat_341,
    cat_342,
    cat_343,
    cat_346,
    cat_347,
    cat_348,
    cat_349,
    cat_35,
    cat_350,
    cat_351,
    cat_352,
    cat_353,
    cat_354,
    cat_355,
    cat_356,
    cat_357,
    cat_358,
    cat_359,
    cat_36,
    cat_360,
    cat_361,
    cat_362,
    cat_363,
    cat_364,
    cat_365,
    cat_367,
    cat_368,
    cat_369,
    cat_37,
    cat_371,
    cat_372,
    cat_373,
    cat_374,
    cat_375,
    cat_376,
    cat_378,
    cat_379,
    cat_38,
    cat_380,
    cat_381,
    cat_382,
    cat_383,
    cat_384,
    cat_385,
    cat_386,
    cat_387,
    cat_388,
    cat_389,
    cat_39,
    cat_390,
    cat_391,
    cat_392,
    cat_393,
    cat_394,
    cat_395,
    cat_396,
    cat_397,
    cat_398,
    cat_399,
    cat_4,
    cat_40,
    cat_400,
    cat_401,
    cat_402,
    cat_403,
    cat_405,
    cat_406,
    cat_407,
    cat_408,
    cat_409,
    cat_41,
    cat_410,
    cat_411,
    cat_412,
    cat_413,
    cat_414,
    cat_416,
    cat_417,
    cat_418,
    cat_419,
    cat_42,
    cat_420,
    cat_421,
    cat_422,
    cat_423,
    cat_424,
    cat_425,
    cat_426,
    cat_427,
    cat_428,
    cat_429,
    cat_43,
    cat_430,
    cat_431,
    cat_432,
    cat_433,
    cat_434,
    cat_435,
    cat_436,
    cat_437,
    cat_438,
    cat_439,
    cat_44,
    cat_440,
    cat_441,
    cat_442,
    cat_443,
    cat_444,
    cat_445,
    cat_446,
    cat_447,
    cat_448,
    cat_449,
    cat_45,
    cat_450,
    cat_451,
    cat_452,
    cat_453,
    cat_454,
    cat_455,
    cat_457,
    cat_458,
    cat_459,
    cat_46,
    cat_460,
    cat_461,
    cat_462,
    cat_463,
    cat_464,
    cat_465,
    cat_466,
    cat_467,
    cat_468,
    cat_469,
    cat_47,
    cat_470,
    cat_471,
    cat_472,
    cat_473,
    cat_474,
    cat_475,
    cat_476,
    cat_477,
    cat_478,
    cat_479,
    cat_48,
    cat_480,
    cat_481,
    cat_482,
    cat_483,
    cat_484,
    cat_485,
    cat_486,
    cat_487,
    cat_488,
    cat_489,
    cat_49,
    cat_490,
    cat_491,
    cat_492,
    cat_493,
    cat_494,
    cat_495,
    cat_496,
    cat_497,
    cat_498,
    cat_499,
    cat_5,
    cat_50,
    cat_500,
    cat_501,
    cat_502,
    cat_503,
    cat_504,
    cat_505,
    cat_506,
    cat_507,
    cat_508,
    cat_509,
    cat_51,
    cat_510,
    cat_511,
    cat_512,
    cat_513,
    cat_514,
    cat_515,
    cat_516,
    cat_517,
    cat_518,
    cat_519,
    cat_52,
    cat_520,
    cat_521,
    cat_522,
    cat_523,
    cat_524,
    cat_525,
    cat_526,
    cat_527,
    cat_53,
    cat_530,
    cat_532,
    cat_533,
    cat_534,
    cat_535,
    cat_536,
    cat_537,
    cat_538,
    cat_539,
    cat_54,
    cat_540,
    cat_541,
    cat_542,
    cat_543,
    cat_544,
    cat_545,
    cat_546,
    cat_547,
    cat_548,
    cat_549,
    cat_55,
    cat_550,
    cat_551,
    cat_552,
    cat_553,
    cat_554,
    cat_555,
    cat_556,
    cat_557,
    cat_558,
    cat_559,
    cat_56,
    cat_560,
    cat_561,
    cat_562,
    cat_563,
    cat_564,
    cat_565,
    cat_566,
    cat_567,
    cat_568,
    cat_569,
    cat_57,
    cat_570,
    cat_571,
    cat_572,
    cat_573,
    cat_574,
    cat_575,
    cat_576,
    cat_577,
    cat_578,
    cat_579,
    cat_58,
    cat_580,
    cat_581,
    cat_582,
    cat_583,
    cat_584,
    cat_585,
    cat_586,
    cat_587,
    cat_588,
    cat_59,
    cat_590,
    cat_591,
    cat_592,
    cat_593,
    cat_594,
    cat_595,
    cat_596,
    cat_597,
    cat_598,
    cat_599,
    cat_6,
    cat_60,
    cat_600,
    cat_601,
    cat_602,
    cat_603,
    cat_604,
    cat_605,
    cat_606,
    cat_607,
    cat_608,
    cat_609,
    cat_61,
    cat_610,
    cat_611,
    cat_612,
    cat_613,
    cat_614,
    cat_615,
    cat_616,
    cat_617,
    cat_618,
    cat_619,
    cat_62,
    cat_620,
    cat_621,
    cat_622,
    cat_623,
    cat_624,
    cat_625,
    cat_626,
    cat_627,
    cat_628,
    cat_629,
    cat_63,
    cat_630,
    cat_631,
    cat_632,
    cat_633,
    cat_634,
    cat_635,
    cat_636,
    cat_637,
    cat_638,
    cat_639,
    cat_64,
    cat_640,
    cat_641,
    cat_642,
    cat_643,
    cat_644,
    cat_645,
    cat_646,
    cat_647,
    cat_648,
    cat_649,
    cat_65,
    cat_650,
    cat_651,
    cat_652,
    cat_653,
    cat_654,
    cat_655,
    cat_656,
    cat_657,
    cat_658,
    cat_659,
    cat_66,
    cat_660,
    cat_661,
    cat_662,
    cat_663,
    cat_664,
    cat_665,
    cat_666,
    cat_667,
    cat_668,
    cat_669,
    cat_67,
    cat_670,
    cat_671,
    cat_672,
    cat_673,
    cat_674,
    cat_675,
    cat_676,
    cat_677,
    cat_678,
    cat_679,
    cat_68,
    cat_680,
    cat_681,
    cat_682,
    cat_683,
    cat_684,
    cat_685,
    cat_686,
    cat_687,
    cat_688,
    cat_689,
    cat_69,
    cat_690,
    cat_691,
    cat_692,
    cat_693,
    cat_696,
    cat_697,
    cat_698,
    cat_699,
    cat_7,
    cat_70,
    cat_700,
    cat_702,
    cat_704,
    cat_705,
    cat_706,
    cat_707,
    cat_708,
    cat_709,
    cat_71,
    cat_710,
    cat_711,
    cat_712,
    cat_713,
    cat_714,
    cat_715,
    cat_716,
    cat_717,
    cat_718,
    cat_719,
    cat_72,
    cat_720,
    cat_721,
    cat_722,
    cat_723,
    cat_724,
    cat_725,
    cat_726,
    cat_728,
    cat_729,
    cat_73,
    cat_730,
    cat_731,
    cat_732,
    cat_733,
    cat_734,
    cat_735,
    cat_736,
    cat_737,
    cat_738,
    cat_739,
    cat_74,
    cat_740,
    cat_741,
    cat_742,
    cat_743,
    cat_744,
    cat_745,
    cat_746,
    cat_747,
    cat_748,
    cat_749,
    cat_750,
    cat_751,
    cat_752,
    cat_753,
    cat_754,
    cat_755,
    cat_756,
    cat_757,
    cat_758,
    cat_759,
    cat_76,
    cat_760,
    cat_761,
    cat_762,
    cat_763,
    cat_764,
    cat_765,
    cat_766,
    cat_767,
    cat_768,
    cat_769,
    cat_77,
    cat_770,
    cat_771,
    cat_772,
    cat_773,
    cat_774,
    cat_775,
    cat_776,
    cat_777,
    cat_778,
    cat_779,
    cat_78,
    cat_781,
    cat_782,
    cat_783,
    cat_784,
    cat_785,
    cat_786,
    cat_787,
    cat_788,
    cat_789,
    cat_79,
    cat_790,
    cat_791,
    cat_792,
    cat_793,
    cat_794,
    cat_795,
    cat_796,
    cat_797,
    cat_798,
    cat_799,
    cat_8,
    cat_80,
    cat_800,
    cat_801,
    cat_802,
    cat_803,
    cat_804,
    cat_805,
    cat_806,
    cat_807,
    cat_808,
    cat_809,
    cat_81,
    cat_810,
    cat_811,
    cat_812,
    cat_813,
    cat_814,
    cat_815,
    cat_816,
    cat_817,
    cat_818,
    cat_819,
    cat_82,
    cat_820,
    cat_821,
    cat_822,
    cat_824,
    cat_825,
    cat_826,
    cat_827,
    cat_828,
    cat_829,
    cat_83,
    cat_831,
    cat_832,
    cat_833,
    cat_834,
    cat_835,
    cat_836,
    cat_837,
    cat_838,
    cat_839,
    cat_84,
    cat_840,
    cat_841,
    cat_842,
    cat_843,
    cat_844,
    cat_845,
    cat_846,
    cat_847,
    cat_848,
    cat_849,
    cat_85,
    cat_850,
    cat_851,
    cat_852,
    cat_853,
    cat_855,
    cat_856,
    cat_857,
    cat_858,
    cat_859,
    cat_86,
    cat_860,
    cat_861,
    cat_862,
    cat_863,
    cat_864,
    cat_865,
    cat_866,
    cat_867,
    cat_868,
    cat_869,
    cat_87,
    cat_870,
    cat_871,
    cat_872,
    cat_873,
    cat_874,
    cat_875,
    cat_876,
    cat_877,
    cat_878,
    cat_879,
    cat_88,
    cat_880,
    cat_881,
    cat_882,
    cat_883,
    cat_884,
    cat_885,
    cat_886,
    cat_887,
    cat_888,
    cat_889,
    cat_89,
    cat_890,
    cat_891,
    cat_892,
    cat_893,
    cat_894,
    cat_895,
    cat_896,
    cat_897,
    cat_898,
    cat_899,
    cat_9,
    cat_90,
    cat_900,
    cat_901,
    cat_902,
    cat_903,
    cat_904,
    cat_905,
    cat_906,
    cat_907,
    cat_908,
    cat_909,
    cat_91,
    cat_910,
    cat_911,
    cat_912,
    cat_913,
    cat_914,
    cat_915,
    cat_916,
    cat_917,
    cat_918,
    cat_919,
    cat_92,
    cat_920,
    cat_921,
    cat_922,
    cat_923,
    cat_924,
    cat_925,
    cat_926,
    cat_927,
    cat_928,
    cat_929,
    cat_93,
    cat_930,
    cat_931,
    cat_932,
    cat_933,
    cat_934,
    cat_935,
    cat_936,
    cat_937,
    cat_938,
    cat_939,
    cat_94,
    cat_940,
    cat_941,
    cat_942,
    cat_943,
    cat_944,
    cat_945,
    cat_946,
    cat_947,
    cat_948,
    cat_949,
    cat_95,
    cat_950,
    cat_951,
    cat_952,
    cat_953,
    cat_954,
    cat_955,
    cat_956,
    cat_957,
    cat_958,
    cat_959,
    cat_96,
    cat_960,
    cat_961,
    cat_962,
    cat_963,
    cat_964,
    cat_965,
    cat_966,
    cat_967,
    cat_968,
    cat_969,
    cat_97,
    cat_970,
    cat_972,
    cat_973,
    cat_974,
    cat_975,
    cat_976,
    cat_977,
    cat_978,
    cat_979,
    cat_98,
    cat_980,
    cat_981,
    cat_982,
    cat_983,
    cat_984,
    cat_985,
    cat_986,
    cat_987,
    cat_988,
    cat_99,
    cat_990,
    cat_991,
    cat_992,
    cat_993,
    cat_994,
    cat_995,
    cat_996,
    cat_997,
]

export default function getCatsStep(): Step {
    const image = sample(catUrls);
    return {
        message: addMessageDefaults({image}),
        // TODO: does this even work?
        waitTime: image.endsWith && image.endsWith('gif')
            ? randInt(3000, 5000)
            : randInt(1000, 3000),
    }
}
