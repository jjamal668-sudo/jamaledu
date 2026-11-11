/* kmap.js — خرائط الكويت التفاعلية (مظاهر السطح + الرياح)
   مبنية على شكل (١٦) و(١٩) و(٢٣) من كتاب الاجتماعيات للصف العاشر.
   تُستخدم في ركن المهارات وفي «اختبر نفسك». */
(function(global){
'use strict';
var G = {"kuwait": "M413,73 412,78 409,80 405,80 404,85 398,91 390,93 390,98 387,101 384,101 384,105 378,117 374,119 374,126 370,128 369,137 365,145 362,146 362,155 359,157 359,164 354,175 351,177 351,184 347,186 346,194 343,197 340,204 337,205 336,212 332,213 332,223 330,225 329,230 325,233 325,239 323,242 319,242 319,250 310,261 306,261 306,266 304,269 302,269 300,287 298,288 297,309 292,318 288,319 288,325 285,328 282,328 282,334 275,344 271,344 271,348 267,352 265,352 265,359 261,367 258,370 256,370 255,377 253,379 250,379 250,384 244,393 240,397 237,397 237,402 234,405 233,415 230,421 227,424 225,424 225,431 221,433 221,439 215,450 210,451 210,458 204,459 204,464 194,475 190,475 190,480 187,483 183,483 183,487 173,498 169,498 166,504 161,505 161,510 154,522 151,524 151,530 146,532 146,537 136,550 132,550 132,555 126,558 126,562 117,573 113,574 113,578 110,581 106,581 106,588 98,599 95,599 95,605 92,608 89,608 89,613 81,622 76,623 76,626 73,630 67,630 67,634 56,641 51,641 51,644 48,648 43,648 43,652 32,662 28,662 28,674 32,674 35,676 51,676 53,678 72,679 76,681 91,681 93,683 128,686 130,688 195,694 204,697 214,697 215,699 240,700 242,702 252,702 258,704 267,704 271,706 297,708 298,710 315,710 318,712 325,712 328,714 352,715 354,717 379,719 381,721 416,724 419,726 432,726 434,728 477,732 479,734 513,737 514,739 526,739 540,742 556,743 558,745 576,745 581,748 592,748 594,752 597,754 598,760 600,760 604,764 604,770 610,773 613,780 614,788 618,790 618,796 621,796 629,808 629,813 632,813 635,816 635,822 638,822 647,834 647,839 650,839 653,842 653,846 656,846 666,857 666,864 671,866 671,876 674,887 674,912 669,923 669,957 672,960 672,966 677,972 683,976 684,980 689,980 692,983 692,988 696,988 698,990 698,993 703,1002 703,1006 705,1006 708,1009 708,1012 712,1012 722,1021 724,1027 730,1028 731,1033 735,1033 743,1042 743,1054 800,1054 830,1052 859,1053 1144,1051 1191,1049 1178,1033 1177,1029 1173,1024 1171,1011 1168,1006 1168,1000 1166,996 1169,992 1173,990 1173,982 1163,956 1161,945 1165,938 1167,926 1171,921 1171,915 1160,917 1144,913 1138,909 1133,908 1127,901 1120,897 1111,884 1105,863 1104,850 1108,837 1108,824 1091,822 1073,814 1061,802 1058,790 1045,784 1043,774 1038,770 1033,761 1032,755 1029,750 1028,742 1024,734 1023,710 1019,703 1013,680 1013,671 1008,655 1007,638 1002,630 1002,627 998,625 995,613 991,607 981,577 980,542 985,531 986,519 979,518 975,520 970,526 965,528 959,534 948,534 940,525 932,520 931,516 928,513 924,512 921,509 920,505 924,502 924,497 910,496 899,507 897,513 891,518 883,522 874,519 869,519 868,531 865,534 842,544 819,543 815,538 815,514 818,511 818,507 807,508 805,505 800,505 793,514 780,518 770,517 767,513 763,513 754,521 748,514 745,505 747,503 756,505 761,495 770,484 775,491 780,491 782,487 790,481 792,476 799,470 800,467 806,461 811,459 814,451 822,445 827,433 841,421 843,421 851,412 871,404 880,396 883,396 890,391 894,390 901,383 920,376 927,375 953,379 968,379 975,383 991,388 999,393 1014,396 1019,402 1028,408 1031,414 1038,413 1041,406 1041,394 1038,385 1029,367 1028,360 1024,355 1022,348 1018,343 1017,338 1013,332 1011,324 1006,319 1005,315 997,308 991,298 990,291 987,286 990,278 990,270 975,263 968,258 964,258 957,251 954,245 953,238 938,208 936,198 933,194 931,183 929,180 929,168 932,163 933,145 929,137 933,133 933,129 925,120 924,111 934,96 921,97 919,95 910,95 909,87 907,92 904,91 905,86 902,83 902,80 897,80 897,85 895,88 893,88 891,86 884,84 881,80 875,80 873,77 865,76 856,71 855,69 849,69 845,65 837,64 830,61 829,57 822,57 819,55 819,53 812,53 810,51 804,50 801,47 801,45 793,45 792,41 782,40 775,37 774,34 767,34 765,32 765,29 756,29 747,24 528,24 525,29 517,30 515,33 504,40 498,40 496,46 490,46 490,49 488,51 478,56 471,56 468,59 461,59 460,61 451,64 431,66 430,69 423,72Z", "bub": "M1009,98 1005,105 998,106 992,110 989,119 987,114 982,114 979,118 972,119 965,125 963,125 957,132 952,133 952,137 955,140 955,148 956,150 967,150 979,156 981,159 989,160 996,164 1002,164 1006,161 1007,157 1012,154 1013,143 1015,140 1018,144 1018,158 1023,162 1038,160 1037,148 1041,141 1056,144 1059,148 1057,150 1050,152 1047,159 1038,164 1035,168 1036,177 1043,178 1044,182 1041,185 1031,187 1029,189 1029,194 1037,195 1039,197 1039,203 1036,206 1032,206 1029,203 1028,198 1025,197 1024,188 1016,179 1019,178 1019,174 1015,171 1007,171 1006,176 1012,179 1001,184 1001,188 1013,193 1016,197 1014,201 1008,201 995,196 989,192 983,184 976,182 970,178 954,180 951,176 950,170 945,168 946,166 949,166 949,162 946,162 944,160 943,155 939,155 939,174 941,178 941,183 944,187 948,189 944,192 944,196 950,203 954,205 953,213 956,216 956,224 958,226 964,226 968,221 970,221 976,227 964,231 965,243 979,245 985,250 991,251 993,253 992,261 999,263 1001,265 1001,278 1006,288 1012,294 1015,300 1020,302 1023,306 1029,323 1030,334 1034,342 1035,351 1037,355 1040,357 1042,363 1049,371 1053,373 1059,373 1075,379 1087,378 1111,366 1121,354 1130,350 1138,344 1142,336 1147,332 1149,326 1160,310 1167,290 1167,259 1163,248 1162,239 1155,229 1136,213 1134,208 1127,201 1125,194 1113,182 1110,175 1101,168 1098,160 1094,155 1093,147 1088,142 1084,140 1074,139 1071,136 1070,128 1063,127 1058,120 1051,118 1047,114 1041,112 1038,108 1032,106 1018,105 1017,100 1015,98Z", "fal": "M1101,453 1098,461 1098,470 1100,472 1113,471 1117,473 1138,474 1143,478 1143,480 1146,483 1151,484 1157,489 1162,490 1168,496 1174,496 1173,485 1167,478 1166,474 1158,468 1157,464 1153,459 1149,459 1137,451 1126,448 1123,443 1115,444 1114,446 1109,445Z", "sea": "M897,24 898,30 902,32 906,45 907,73 903,79 903,83 906,86 905,91 907,91 910,82 910,48 903,32ZM992,12 994,45 988,51 987,58 977,61 974,66 959,72 962,76 968,77 974,73 983,71 984,74 988,74 991,78 1000,80 1008,79 1008,75 1013,74 1015,80 1011,82 1018,85 1018,90 1013,93 1000,94 986,100 963,117 938,121 935,117 936,110 954,90 949,81 942,86 941,91 936,94 925,111 925,118 934,129 934,133 930,137 934,145 933,163 930,168 930,180 939,208 954,238 958,251 964,257 968,257 991,270 991,278 988,286 992,298 998,308 1006,315 1007,319 1012,324 1014,332 1029,360 1030,367 1042,394 1042,406 1037,415 1031,415 1027,408 1019,403 1014,397 999,394 968,380 953,380 927,376 901,384 887,395 880,397 871,405 851,413 843,422 828,433 823,445 815,451 812,459 801,467 791,481 786,484 780,492 775,492 770,485 756,506 747,504 749,514 754,520 763,512 767,512 773,517 780,517 793,513 800,504 805,504 807,507 818,506 819,511 816,514 816,538 819,542 842,543 865,533 867,531 867,520 869,518 883,521 891,517 910,495 924,496 925,502 921,505 922,509 928,512 933,520 940,524 948,533 961,532 979,517 985,517 987,519 986,531 981,542 982,577 999,625 1003,627 1008,638 1008,648 1014,671 1014,680 1020,703 1024,710 1025,734 1034,761 1039,770 1044,774 1046,784 1059,790 1062,802 1073,813 1091,821 1105,822 1109,824 1109,837 1105,850 1106,863 1112,884 1121,897 1127,900 1133,907 1144,912 1160,916 1166,914 1172,915 1172,921 1168,926 1166,938 1162,945 1164,956 1174,982 1174,990 1167,995 1169,1006 1172,1011 1174,1024 1179,1033 1191,1048 1196,1049 1199,1052 1200,1057 1213,1070 1217,1072 1474,1072 1474,963 1472,960 1474,929 1474,855 1472,827 1474,808 1472,753 1474,748 1472,741 1474,724 1474,627 1471,625 1472,533 1474,530 1473,432 1471,423 1471,400 1473,390 1471,371 1471,320 1474,297 1474,189 1473,185 1468,181 1468,177 1474,173 1474,162 1465,160 1461,161 1456,166 1457,184 1453,188 1446,189 1440,193 1432,193 1427,189 1417,187 1396,171 1389,169 1388,163 1376,160 1369,155 1363,155 1356,168 1356,184 1360,190 1361,203 1366,209 1365,217 1363,219 1351,219 1347,226 1324,224 1314,214 1307,203 1306,187 1296,183 1273,182 1253,178 1241,170 1235,173 1222,173 1209,170 1198,164 1185,152 1144,132 1138,125 1133,123 1124,112 1122,98 1108,92 1099,83 1085,79 1068,78 1057,69 1051,68 1043,60 1016,58 1011,52 1000,46 1000,39 997,35 997,18 995,13Z", "border": "M893,88 L881,80 L875,80 L855,69 L830,61 L829,57 L804,50 L801,45 L793,45 L792,41 L782,40 L774,34 L767,34 L765,29 L756,29 L747,24 L528,24 L525,29 L517,30 L504,40 L498,40 L496,46 L490,46 L488,51 L451,64 L431,66 L423,72 L413,73 L412,78 L405,80 L398,91 L390,93 L390,98 L384,101 L378,117 L374,119 L374,126 L370,128 L369,137 L362,146 L362,155 L351,177 L351,184 L347,186 L346,194 L337,205 L336,212 L332,213 L332,223 L325,233 L325,239 L319,242 L319,250 L310,261 L306,261 L306,266 L302,269 L297,309 L292,318 L288,319 L288,325 L282,328 L279,339 L265,352 L265,359 L256,370 L255,377 L250,379 L244,393 L237,397 L233,415 L225,424 L225,431 L221,433 L215,450 L210,451 L210,458 L204,459 L204,464 L194,475 L190,475 L190,480 L183,483 L180,491 L173,498 L169,498 L166,504 L161,505 L161,510 L151,524 L151,530 L146,532 L143,542 L136,550 L132,550 L132,555 L126,558 L126,562 L113,574 L113,578 L106,581 L106,588 L101,596 L95,599 L95,605 L89,608 L85,618 L76,623 L73,630 L67,630 L67,634 L62,638 L51,641 L48,648 L43,648 L43,652 L37,658 L28,662 L28,674 L592,748 L598,760 L604,764 L604,770 L610,773 L618,796 L625,801 L629,813 L635,816 L635,822 L641,825 L647,839 L653,842 L653,846 L666,857 L666,864 L671,866 L674,912 L669,923 L669,957 L672,966 L684,980 L692,983 L692,988 L698,990 L703,1006 L708,1012 L715,1014 L724,1027 L730,1028 L731,1033 L735,1033 L743,1042 L743,1054 L1178,1050", "w": 1475, "h": 1073, "x0": 224, "y0": 148};
var CATS = {"plateau": {"n": "هضبة", "pl": "الهضاب", "g": "f", "col": "#111827", "shape": "circle", "def": "أرض مرتفعة عن سطح البحر تتميز بسطحها المنبسط أو المستوي نسبياً وتمتد لمساحة واسعة."}, "hill": {"n": "تلّ", "pl": "التلال", "g": "f", "col": "#2f5bd6", "shape": "circle", "def": "أراضٍ مرتفعة عما يحيط بها، لكنها أقل ارتفاعاً من الجبال."}, "plain": {"n": "سهل", "pl": "السهول", "g": "f", "col": "#1fa35c", "shape": "circle", "def": "مساحة واسعة من الأراضي المنبسطة أو المستوية قليلة الارتفاع."}, "valley": {"n": "وادٍ / منخفض", "pl": "الوديان", "g": "f", "col": "#e0368f", "shape": "circle", "def": "مجارٍ مائية قديمة نشأت بفعل جريان مياه الأمطار الغزيرة، ثم جفّت مع مرور الزمن."}, "dune": {"n": "كثيب رملي", "pl": "الكثبان الرملية", "g": "s", "col": "#9b3fb5", "shape": "circle", "def": "تجمعات رملية تتكوّن بفعل الرياح، وتظهر على شكل تلال منفردة أو سلاسل من التلال الرملية."}, "khabra": {"n": "خَبرة", "pl": "الخباري", "g": "s", "col": "#d9782d", "shape": "circle", "def": "منخفضات صحراوية تتجمع فيها مياه الأمطار والسيول بصورة مؤقتة، ثم تتناقص مياهها تدريجياً بفعل التبخر والتسرب إلى التربة."}, "island": {"n": "جزيرة", "pl": "الجزر", "g": "c", "col": "#8e3fb0", "shape": "tri", "def": "من أشكال السطح الساحلية البارزة، وعددها في الكويت تسع جزر."}, "head": {"n": "رأس", "pl": "الرؤوس", "g": "c", "col": "#d62f3a", "shape": "sq", "def": "أجزاء من اليابس تمتد داخل البحر."}, "khor": {"n": "خور", "pl": "الأخوار", "g": "c", "col": "#ffffff", "shape": "sq", "def": "ممرات مائية ضيقة تمتد من البحر إلى داخل اليابسة."}, "bay": {"n": "جون / خليج", "pl": "الخلجان", "g": "c", "col": "#f0803c", "shape": "hatch", "def": "سطح مائي ضحل يمتد داخل اليابسة في منتصف الشريط الساحلي."}};
var PLACES = [{"k": "ahmadi", "c": "plateau", "n": "هضبة الأحمدي", "x": 940, "y": 663, "lon": 48.025, "lat": 29.129, "b": "تقع في جنوب دولة الكويت، ويبلغ ارتفاعها ما بين (١٢٥–١٣٧ متراً تقريباً) عن سطح البحر. وهي المثال الذي ذكره الكتاب على الهضاب.", "pg": 96, "la": "end", "dx": -34, "dy": 6}, {"k": "layyah", "c": "hill", "n": "تلال الليّاح", "x": 527, "y": 365, "lon": 47.374, "lat": 29.579, "b": "من التلال الشمالية، وهي أقل ارتفاعاً من تلال جال الزور، وتمتد في اتجاه الشمال الشرقي.", "pg": 96, "la": "middle", "dx": -30, "dy": -34}, {"k": "kara", "c": "hill", "n": "تلال كراع المرو", "x": 668, "y": 435, "lon": 47.597, "lat": 29.475, "b": "من التلال الشمالية، وهي أقل ارتفاعاً من تلال جال الزور، وتمتد في اتجاه الشمال الشرقي.", "pg": 96, "la": "end", "dx": -34, "dy": 10}, {"k": "jalzor", "c": "hill", "n": "تلال جال الزور", "x": 870, "y": 379, "lon": 47.914, "lat": 29.559, "b": "من أبرز التلال الشمالية؛ حافة صخرية تمتد بمحاذاة الساحل الشمالي الغربي لجون الكويت.", "pg": 96, "la": "end", "dx": -34, "dy": 10}, {"k": "burqan", "c": "hill", "n": "تل برقان", "x": 828, "y": 699, "lon": 47.848, "lat": 29.076, "b": "من التلال الجنوبية، وقد ذكر الكتاب من أبرزها: تل وارة وتلال برقان.", "pg": 96, "la": "end", "dx": -34, "dy": 22}, {"k": "dabdaba", "c": "plain", "n": "سهل الدبدبة", "x": 530, "y": 591, "lon": 47.378, "lat": 29.238, "b": "يقع في الجزء الغربي والجنوبي من دولة الكويت.", "pg": 96, "la": "end", "dx": -34, "dy": 10}, {"k": "adan", "c": "plain", "n": "سهل العدان", "x": 970, "y": 597, "lon": 48.072, "lat": 29.23, "b": "يقع جنوب دولة الكويت.", "pg": 96, "la": "start", "dx": 34, "dy": 10}, {"k": "batin", "c": "valley", "n": "وادي الباطن", "x": 318, "y": 352, "lon": 47.045, "lat": 29.6, "b": "من أبرز الوديان؛ يمتد بمحاذاة الحدود الغربية لدولة الكويت باتجاه شمال شرقي وجنوب غربي.", "pg": 96, "la": "end", "dx": -34, "dy": 10}, {"k": "ramram", "c": "valley", "n": "منخفض أم الرمم", "x": 902, "y": 297, "lon": 47.965, "lat": 29.682, "b": "من المنخفضات الصحراوية؛ يقع في شمال شرق دولة الكويت، ويُعد من المنخفضات الكبيرة نسبياً إذ تمتد مساحته إلى عدة كيلومترات.", "pg": 96, "la": "end", "dx": -34, "dy": 14}, {"k": "umnaqa", "c": "dune", "n": "كثبان أم نقا", "x": 781, "y": 160, "lon": 47.774, "lat": 29.89, "b": "من أمثلة الكثبان الرملية في الكويت: الهويملية وأم نقا والصقيهية.", "pg": 97, "la": "end", "dx": -34, "dy": 10}, {"k": "rawdatain", "c": "khabra", "n": "خبرة الروضتين", "x": 745, "y": 208, "lon": 47.718, "lat": 29.817, "b": "من أمثلة الخباري في الكويت: خباري أم العيش والروضتين.", "pg": 97, "la": "end", "dx": -34, "dy": 10}, {"k": "umaish", "c": "khabra", "n": "خبرة أم العيش", "x": 870, "y": 244, "lon": 47.914, "lat": 29.762, "b": "من أمثلة الخباري في الكويت: خباري أم العيش والروضتين.", "pg": 97, "la": "end", "dx": -34, "dy": 12}, {"k": "warba", "c": "island", "n": "جزيرة وربة", "x": 991, "y": 86, "lon": 48.105, "lat": 30.002, "b": "إحدى جزر الكويت التسع: بوبيان، وربة، فيلكا، مسكان، عوهة، أم النمل، كبر، قاروه، أم المرادم.", "pg": 97, "la": "end", "dx": -34, "dy": 22}, {"k": "bubiyan", "c": "island", "n": "جزيرة بوبيان", "x": 1085, "y": 253, "lon": 48.254, "lat": 29.749, "b": "أكبر الجزر الكويتية مساحة، وتبلغ حوالي ٥٪ من مساحة دولة الكويت، وفيها يُنفذ مشروع ميناء مبارك الكبير.", "pg": 97, "la": "start", "dx": 34, "dy": 38}, {"k": "miskan", "c": "island", "n": "جزيرة مسكان", "x": 1067, "y": 414, "lon": 48.225, "lat": 29.505, "b": "إحدى جزر الكويت التسع: بوبيان، وربة، فيلكا، مسكان، عوهة، أم النمل، كبر، قاروه، أم المرادم.", "pg": 97, "la": "middle", "dx": 0, "dy": -34}, {"k": "failaka", "c": "island", "n": "جزيرة فيلكا", "x": 1190, "y": 443, "lon": 48.421, "lat": 29.463, "b": "جزيرة كانت مأهولة بالسكان، وهي من الجزر التي أسهم موقعها في دعم النشاط البحري والتجاري والملاحة والصيد.", "pg": 97, "la": "start", "dx": 34, "dy": 10, "alt": [[1137, 470]]}, {"k": "umnamel", "c": "island", "n": "جزيرة أم النمل", "x": 836, "y": 461, "lon": 47.861, "lat": 29.436, "b": "إحدى جزر الكويت التسع: بوبيان، وربة، فيلكا، مسكان، عوهة، أم النمل، كبر، قاروه، أم المرادم.", "pg": 97, "la": "end", "dx": -34, "dy": 40}, {"k": "auhah", "c": "island", "n": "جزيرة عوهة", "x": 1222, "y": 519, "lon": 48.469, "lat": 29.347, "b": "إحدى جزر الكويت التسع: بوبيان، وربة، فيلكا، مسكان، عوهة، أم النمل، كبر، قاروه، أم المرادم.", "pg": 97, "la": "start", "dx": 34, "dy": 14}, {"k": "kubbar", "c": "island", "n": "جزيرة كبر", "x": 1210, "y": 682, "lon": 48.451, "lat": 29.102, "b": "إحدى جزر الكويت التسع: بوبيان، وربة، فيلكا، مسكان، عوهة، أم النمل، كبر، قاروه، أم المرادم.", "pg": 97, "la": "start", "dx": 34, "dy": 10}, {"k": "qaruh", "c": "island", "n": "جزيرة قاروه", "x": 1398, "y": 846, "lon": 48.746, "lat": 28.854, "b": "أصغر الجزر الكويتية.", "pg": 97, "la": "end", "dx": -34, "dy": 10}, {"k": "maradim", "c": "island", "n": "جزيرة أم المرادم", "x": 1410, "y": 983, "lon": 48.765, "lat": 28.646, "b": "إحدى جزر الكويت التسع: بوبيان، وربة، فيلكا، مسكان، عوهة، أم النمل، كبر، قاروه، أم المرادم.", "pg": 97, "la": "end", "dx": -34, "dy": 10}, {"k": "rasardh", "c": "head", "n": "رأس الأرض", "x": 974, "y": 535, "lon": 48.078, "lat": 29.324, "b": "من أمثلة الرؤوس في الكويت: رأس الأرض، ورأس عجوزة (بالقرب من أبراج الكويت)، ورأس كاظمة، ورأس الصبية، ورأس عشيرج، ورأس الجليعة، ورأس الزور.", "pg": 98, "la": "start", "dx": 34, "dy": 10}, {"k": "rasjulaia", "c": "head", "n": "رأس الجليعة", "x": 1094, "y": 836, "lon": 48.267, "lat": 28.868, "b": "من أمثلة الرؤوس في الكويت: رأس الأرض، ورأس عجوزة، ورأس كاظمة، ورأس الصبية، ورأس عشيرج، ورأس الجليعة، ورأس الزور.", "pg": 98, "la": "end", "dx": -34, "dy": 10}, {"k": "raszour", "c": "head", "n": "رأس الزور", "x": 1157, "y": 929, "lon": 48.367, "lat": 28.729, "b": "من أمثلة الرؤوس في الكويت: رأس الأرض، ورأس عجوزة، ورأس كاظمة، ورأس الصبية، ورأس عشيرج، ورأس الجليعة، ورأس الزور.", "pg": 98, "la": "start", "dx": 34, "dy": 10}, {"k": "khorabdullah", "c": "khor", "n": "خور عبدالله", "x": 1151, "y": 189, "lon": 48.358, "lat": 29.846, "b": "من أكبر الأخوار في دولة الكويت. وتكمن أهمية الأخوار في دعم تنوع الحياة البحرية والفطرية، والملاحة، والمشاريع السياحية والترفيهية مثل منتزه الخيران.", "pg": 98, "la": "start", "dx": 34, "dy": 10}, {"k": "khoramiya", "c": "khor", "n": "خور العمي", "x": 1129, "y": 960, "lon": 48.323, "lat": 28.681, "b": "من أمثلة الأخوار في الكويت: خور عبدالله، وخور الصبية، وخور بوبيان، وخور المفتح، وخور العمي.", "pg": 98, "la": "end", "dx": -34, "dy": 10}, {"k": "junkuwait", "c": "bay", "n": "جون الكويت", "x": 920, "y": 440, "lon": 47.992, "lat": 29.466, "b": "أكبر خلجان الكويت وأبرزها؛ مسطح مائي ضحل يمتد داخل اليابسة في منتصف الشريط الساحلي، ويتفرع منه خليج كاظمة غرباً وخليج الصليبيخات جنوب غرب، وهو موطن طبيعي للعديد من الكائنات البحرية والطيور.", "pg": 98, "la": "middle", "dx": 0, "dy": 65}];
var GRID = { lon:[[47,287,'47°E'],[47.5,610,'47°30′E'],[48,925,'48°E'],[48.5,1240,'48°30′E']], lat:[[30,88,'30°N'],[29.5,416,'29°30′N'],[29,750,'29°N']] };
var BAY = { x:871, y:402, w:98, h:77 };
var NS = 'http://www.w3.org/2000/svg';
var AR = '٠١٢٣٤٥٦٧٨٩';
function arn(n){ return String(n).replace(/\d/g, function(d){ return AR.charAt(+d); }); }
function S(tag, attrs, parent){
  var e = document.createElementNS(NS, tag);
  if(attrs){ for(var k in attrs){ if(attrs[k] != null){ e.setAttribute(k, attrs[k]); } } }
  if(parent){ parent.appendChild(e); }
  return e;
}
function H(tag, cls, txt, parent){
  var e = document.createElement(tag);
  if(cls){ e.className = cls; }
  if(txt != null){ e.textContent = txt; }
  if(parent){ parent.appendChild(e); }
  return e;
}
function shuf(a){ a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
var byKey = {}; PLACES.forEach(function(p){ byKey[p.k] = p; });
var uid = 0;
function reduced(){ try{ return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } }

/* ============================ CSS ============================ */
var CSS = [
'.km{position:relative;width:100%;--km-sea:#9fc7d6;--km-sea2:#7fb2c6;--km-kw:#fbf1d4;--km-land:#e4d3ad;--km-ink:#1b2430;--km-halo:#fffaf0;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}',
'.km-svg{display:block;width:100%;height:auto;border-radius:18px;background:var(--km-land);box-shadow:0 18px 40px -18px rgba(0,0,0,.55);direction:ltr;touch-action:pan-y;outline:none}',
'.km-land0{fill:var(--km-land)} .km-kw{fill:var(--km-kw);stroke:#c9b27a;stroke-width:1.4;stroke-linejoin:round}',
'.km-sea{fill:var(--km-sea);stroke:#6e9fb4;stroke-width:1.6;stroke-linejoin:round}',
'.km-grid{stroke:#6b8aa0;stroke-opacity:.45;stroke-width:1.3;fill:none}',
'.km-gl{font:700 24px Cairo,Tajawal,sans-serif;fill:#52667a;opacity:.85}',
'.km-border{fill:none;stroke:#c0242f;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:2 11}',
'.km-border2{fill:none;stroke:#c0242f;stroke-width:3;stroke-linejoin:round;opacity:0}',
'.km-nb{font:800 44px Cairo,Tajawal,sans-serif;fill:#8a7550;opacity:.75;text-anchor:middle}',
'.km-sealb{font:800 54px Cairo,Tajawal,sans-serif;fill:#3b6f86;opacity:.65;text-anchor:middle;letter-spacing:2px}',
'.km-kwb{font:900 62px Cairo,Tajawal,sans-serif;fill:#6d5a2c;opacity:.22;text-anchor:middle}',
'.km-lb{font:800 36px Cairo,Tajawal,sans-serif;fill:var(--km-ink);paint-order:stroke;stroke:var(--km-halo);stroke-width:8px;stroke-linejoin:round;pointer-events:none;transition:opacity .35s ease, transform .35s ease}',
'.km.nolabels .km-lb{opacity:0}',
'.km-lb.on{opacity:1!important}',
'.km-pin{cursor:pointer;outline:none}',
'.km-pin .km-in{transform-box:fill-box;transform-origin:center;transition:transform .25s cubic-bezier(.3,1.6,.5,1)}',
'.km-pin:hover .km-in,.km-pin:focus-visible .km-in{transform:scale(1.28)}',
'.km-pin.off{display:none}',
'.km-pin .sh{stroke:#fff;stroke-width:5;stroke-linejoin:round;paint-order:stroke}',
'.km-pin .ring{display:none;fill:none;stroke:#1b2430;stroke-width:4;stroke-dasharray:9 7;transform-box:fill-box;transform-origin:center}',
'.km-pin.sel .ring{display:block;animation:kmSpin 6s linear infinite}',
'.km-pin.sel .km-in{transform:scale(1.35)}',
'.km.dim .km-pin:not(.focus){opacity:.18;pointer-events:none} .km.dim .km-lb:not(.focus){opacity:0!important}',
'.km-rip{fill:none;stroke:#e8590c;stroke-width:6;transform-box:fill-box;transform-origin:center;animation:kmRip 1.5s ease-out infinite;pointer-events:none}',
'.km-rip.r2{animation-delay:.5s}.km-rip.r3{animation-delay:1s}',
'.km-pin.ok .sh{stroke:#16a34a;stroke-width:8} .km-pin.bad .km-in{animation:kmShake .5s ease both} .km-pin.bad .sh{stroke:#dc2626;stroke-width:8}',
'.km-burst{pointer-events:none} .km-burst i{fill:var(--c);animation:kmBurst .85s cubic-bezier(.1,.7,.3,1) forwards;transform-box:fill-box;transform-origin:center}',
'.km-drop .km-pin .km-dr{animation:kmDrop .55s cubic-bezier(.3,1.5,.5,1) both;animation-delay:calc(var(--i) * 38ms + .35s)}',
'.km-drop .km-kw,.km-drop .km-sea{animation:kmFade .8s ease both}',
'.km-drop .km-border{animation:kmFade .6s ease .5s both}',
'.km-slope{pointer-events:none;opacity:0;transition:opacity .4s}.km-slope.on{opacity:1}',
'.km-slope path.fl{fill:none;stroke:#6d28d9;stroke-width:16;stroke-linecap:round;stroke-dasharray:30 24;animation:kmFlow 1.1s linear infinite}',
'.km-slope text{font:800 34px Cairo,Tajawal,sans-serif;fill:#4c1d95;paint-order:stroke;stroke:#fffaf0;stroke-width:9px}',
'.km-ui{position:absolute;bottom:10px;left:10px;display:flex;flex-direction:column;gap:6px;z-index:3}',
'.km-ui button{width:40px;height:40px;border-radius:12px;border:1px solid rgba(0,0,0,.18);background:rgba(255,255,255,.94);color:#1b2430;font:800 20px Cairo,sans-serif;cursor:pointer;line-height:1;box-shadow:0 6px 14px -6px rgba(0,0,0,.4)}',
'.km-ui button:active{transform:scale(.94)}',
'@media (max-width:640px){.km-ui{flex-direction:row;gap:5px;bottom:8px;left:8px}.km-ui button{width:34px;height:34px;font-size:18px;border-radius:10px}}',
'.km-toast{position:absolute;right:50%;bottom:12px;transform:translateX(50%) translateY(20px);background:#1b2430;color:#fff;padding:9px 18px;border-radius:999px;font:700 .92rem Tajawal,sans-serif;opacity:0;pointer-events:none;transition:all .3s;z-index:4;white-space:nowrap;max-width:94%;overflow:hidden;text-overflow:ellipsis}',
'.km-toast.show{opacity:1;transform:translateX(50%) translateY(0)}',
'.km-toast.ok{background:#15803d}.km-toast.bad{background:#b91c1c}',
'@keyframes kmSpin{to{transform:rotate(360deg)}}',
'@keyframes kmRip{0%{transform:scale(1);opacity:.9}100%{transform:scale(3.6);opacity:0}}',
'@keyframes kmShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-14px)}40%{transform:translateX(12px)}60%{transform:translateX(-8px)}80%{transform:translateX(5px)}}',
'@keyframes kmBurst{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(.2);opacity:0}}',
'@keyframes kmDrop{0%{opacity:0;transform:translateY(-70px) scale(.3)}100%{opacity:1;transform:none}}',
'@keyframes kmFade{from{opacity:0}to{opacity:1}}',
'@keyframes kmFlow{to{stroke-dashoffset:-54}}',
'@keyframes kmBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}',
'@keyframes kmDust{0%{transform:translate(0,0);opacity:0}15%{opacity:.85}100%{transform:translate(var(--dx),var(--dy));opacity:0}}',
'@keyframes kmRain{0%{transform:translateY(-10px);opacity:0}20%{opacity:.9}100%{transform:translateY(90px);opacity:0}}',
'@keyframes kmBolt{0%,55%,100%{opacity:0}58%,64%{opacity:1}61%{opacity:.2}}',
'@keyframes kmGlow{0%,100%{opacity:.35}50%{opacity:.8}}',
'@keyframes kmPop{0%{transform:scale(.4);opacity:0}100%{transform:scale(1);opacity:1}}',
'@media (prefers-reduced-motion: reduce){.km *{animation-duration:.001s!important;animation-iteration-count:1!important}}',
/* wind */
'.kw-arrow{cursor:pointer;transition:opacity .3s;transform-box:fill-box;transform-origin:center;filter:drop-shadow(0 4px 3px rgba(0,0,0,.3))}',
'.kw-arrow:focus{outline:none} .kw-arrow:focus-visible .top{stroke:#fff;stroke-width:5}',
'.kw-arrow .side{fill:var(--c);filter:brightness(.58)}',
'.kw-arrow .top{fill:var(--c);stroke:rgba(255,255,255,.75);stroke-width:2.5;stroke-linejoin:round}',
'.kw-arrow .flow{fill:none;stroke:#fff;stroke-opacity:.4;stroke-width:8;stroke-linecap:round;stroke-dasharray:22 150;animation:kwGlint 2.4s linear infinite;pointer-events:none}',
'@keyframes kwGlint{to{stroke-dashoffset:-172}}',
'.km.dim .kw-arrow:not(.focus){opacity:.15;pointer-events:none}',
'.kw-arrow.sel{filter:drop-shadow(0 0 12px var(--c))} .kw-arrow.sel .top{stroke:#fff;stroke-width:5}',
'.kw-arrow.focus{animation:kwPulse 1s ease-in-out infinite}',
'@keyframes kwPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}',
'@keyframes kwIn{0%{opacity:0;transform:translate(var(--ix),var(--iy)) scale(.92)}100%{opacity:1;transform:none}}',
'.km-drop .kw-arrow{animation:kwIn .8s cubic-bezier(.3,1.2,.5,1) .25s backwards}',
'.kw-tag{font:800 34px Cairo,Tajawal,sans-serif;fill:#fff;text-anchor:middle;pointer-events:none}',
'.kw-tagbg{fill:var(--c);opacity:.95}',
'.kw-dust circle{fill:#a16207;animation:kmDust 2.6s linear infinite}',
'.kw-snow circle{fill:#e0f2fe;stroke:#7dd3fc;stroke-width:2;animation:kmDust 3s linear infinite}',
'.kw-rain line{stroke:#2563eb;stroke-width:5;stroke-linecap:round;animation:kmRain 1.1s linear infinite}',
'.kw-bolt{fill:#facc15;stroke:#a16207;stroke-width:3;animation:kmBolt 2.2s infinite}',
'.kw-sun{animation:kmGlow 2s ease-in-out infinite}',
'.kw-pop{animation:kmPop .5s cubic-bezier(.3,1.6,.5,1) both;transform-box:fill-box;transform-origin:center}',
/* ask / runner */
'.km-q{display:flex;flex-direction:column;gap:12px;direction:rtl}',
'.km-q-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
'.km-q-opts button{font:700 1rem Tajawal,Cairo,sans-serif;padding:13px 10px;border-radius:14px;border:2px solid rgba(120,130,150,.35);background:#fff;color:#1b2430;cursor:pointer;transition:transform .15s,background .2s,border-color .2s}',
'.km-q-opts button:hover:not(:disabled){transform:translateY(-2px);border-color:#c9a227}',
'.km-q-opts button.good{background:#dcfce7;border-color:#16a34a}',
'.km-q-opts button.bad{background:#fee2e2;border-color:#dc2626;animation:kmShake .45s}',
'.km-q-opts button:disabled{cursor:default}',
'.km-leg{display:flex;flex-wrap:wrap;gap:6px 12px;justify-content:center;font:600 .78rem Tajawal,sans-serif;color:inherit}',
'.km-leg span{display:inline-flex;align-items:center;gap:5px;background:rgba(120,130,150,.14);padding:3px 9px;border-radius:999px}',
'.km-leg svg{width:14px;height:14px;display:block}',
'.km-hint{font:600 .86rem Tajawal,sans-serif;text-align:center;opacity:.8;margin:0}',
'.kr{direction:rtl;font-family:Tajawal,Cairo,sans-serif;color:#1b2430;background:#fff;border-radius:22px;padding:16px;box-shadow:0 22px 50px -20px rgba(0,0,0,.55);display:flex;flex-direction:column;gap:12px}',
'.kr-top{display:flex;align-items:center;justify-content:space-between;gap:10px;font:700 .88rem Tajawal,sans-serif;color:#4a5a6e}',
'.kr-st{display:inline-flex;gap:8px;align-items:center}',
'.kr-fire{display:inline-block;font-size:1.15rem;animation:kmBob .8s ease-in-out infinite}',
'.kr-bar{height:8px;border-radius:99px;background:#e5e7eb;overflow:hidden}',
'.kr-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#c9a227,#e8743b);border-radius:99px;transition:width .5s cubic-bezier(.3,1.2,.5,1)}',
'.kr-q{font:800 1.1rem Cairo,Tajawal,sans-serif;line-height:1.6;margin:0;text-align:center}',
'.kr-fb{border-radius:14px;padding:11px 14px;font:700 .95rem Tajawal,sans-serif;animation:kmPop .35s ease both}',
'.kr-fb small{display:block;font-weight:500;margin-top:4px;line-height:1.6;opacity:.9}',
'.kr-fb.ok{background:#dcfce7;color:#14532d}.kr-fb.part{background:#fef9c3;color:#713f12}.kr-fb.bad{background:#fee2e2;color:#7f1d1d}',
'.kr-btn{font:800 1rem Cairo,sans-serif;background:#1b2430;color:#fff;border:0;border-radius:14px;padding:12px 22px;cursor:pointer;align-self:center;transition:transform .15s}',
'.kr-btn:hover{transform:translateY(-2px)} .kr-btn.alt{background:#fff;color:#1b2430;border:2px solid #1b2430}',
'.kr-pts{position:absolute;pointer-events:none;font:900 1.6rem Cairo,sans-serif;color:#16a34a;animation:krPts 1s ease-out forwards;z-index:6;text-shadow:0 2px 6px rgba(255,255,255,.9)}',
'@keyframes krPts{0%{transform:translateY(0) scale(.6);opacity:0}20%{opacity:1;transform:translateY(-14px) scale(1.2)}100%{transform:translateY(-70px) scale(1);opacity:0}}',
'.kr-res{text-align:center;display:flex;flex-direction:column;gap:12px;align-items:center}',
'.kr-ring{width:132px;height:132px;position:relative}',
'.kr-ring svg{width:100%;height:100%;transform:rotate(-90deg)}',
'.kr-ring circle{fill:none;stroke-width:11}.kr-ring .bg{stroke:#e5e7eb}.kr-ring .fg{stroke:#16a34a;stroke-linecap:round;stroke-dasharray:326.7;stroke-dashoffset:326.7;transition:stroke-dashoffset 1.2s cubic-bezier(.3,1,.5,1)}',
'.kr-ring b{position:absolute;inset:0;display:grid;place-items:center;font:900 1.9rem Cairo,sans-serif}',
'.kr-stars{font-size:2.1rem;letter-spacing:6px}.kr-stars span{display:inline-block;animation:kmPop .5s cubic-bezier(.3,1.6,.5,1) both}',
'.kr-miss{width:100%;text-align:right;background:#f8fafc;border-radius:14px;padding:10px 14px;font-size:.9rem;line-height:1.7}',
'.kr-miss div{border-bottom:1px dashed #cbd5e1;padding:6px 0}.kr-miss div:last-child{border:0}',
'.kr-conf{position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:50}.kr-conf i{position:absolute;top:-14px;width:9px;height:14px;border-radius:2px;animation:krFall linear forwards}',
'@keyframes krFall{to{transform:translateY(110vh) rotate(540deg);opacity:.9}}'
].join('\n');
function injectCSS(){
  if(document.getElementById('km-css')){ return; }
  var s = document.createElement('style'); s.id = 'km-css'; s.textContent = CSS; document.head.appendChild(s);
}

/* ================== شكل العلامة حسب مفتاح الخريطة في الكتاب ================== */
function legendIcon(cat){
  var c = CATS[cat], s = S('svg', { viewBox:'-14 -14 28 28' });
  if(c.shape === 'circle'){ S('circle', { r:9, fill:c.col, stroke:'#fff', 'stroke-width':2 }, s); }
  else if(c.shape === 'tri'){ S('polygon', { points:'0,-11 11,9 -11,9', fill:c.col, stroke:'#fff', 'stroke-width':1.5 }, s); }
  else if(c.shape === 'sq'){ S('rect', { x:-9, y:-9, width:18, height:18, fill:c.col, stroke:(cat === 'khor' ? '#475569' : '#fff'), 'stroke-width':2 }, s); }
  else { for(var i = -1; i <= 1; i++){ S('line', { x1:-10 + i * 6, y1:10, x2:2 + i * 6, y2:-10, stroke:c.col, 'stroke-width':2.4 }, s); } }
  return s;
}
function legendRow(host, cats){
  var d = H('div', 'km-leg', null, host);
  cats.forEach(function(k){
    var sp = H('span', '', null, d); sp.appendChild(legendIcon(k)); sp.appendChild(document.createTextNode(CATS[k].pl));
  });
  return d;
}
function pinShape(p, parent){
  var c = CATS[p.c];
  if(c.shape === 'circle'){ S('circle', { r:20, fill:c.col, 'class':'sh' }, parent); }
  else if(c.shape === 'tri'){ S('polygon', { points:'0,-27 25,20 -25,20', fill:c.col, 'class':'sh' }, parent); }
  else if(c.shape === 'sq'){ S('rect', { x:-18, y:-18, width:36, height:36, rx:3, fill:c.col, 'class':'sh', style:(p.c === 'khor' ? 'stroke:#334155;stroke-width:4' : '') }, parent); }
  else {
    for(var i = -2; i <= 2; i++){ S('line', { x1:-44 + i * 17, y1:40, x2:4 + i * 17, y2:-40, stroke:c.col, 'stroke-width':6, 'stroke-linecap':'round' }, parent); }
  }
}

/* ============================ الخريطة ============================ */
function KMap(host, opts){
  injectCSS();
  opts = opts || {};
  var self = this, id = 'km' + (++uid);
  this.host = host; this.opts = opts; this.id = id; this.tapFn = null; this.locked = false;
  host.innerHTML = ''; host.classList.add('km');
  if(opts.labels === false){ host.classList.add('nolabels'); }
  var svg = this.svg = S('svg', { viewBox:'0 0 ' + G.w + ' ' + G.h, 'class':'km-svg', role:'img', 'aria-label':'خريطة دولة الكويت' }, host);
  var defs = S('defs', null, svg);
  var clip = S('clipPath', { id:id + 'c' }, defs); S('rect', { width:G.w, height:G.h }, clip);
  var mask = S('mask', { id:id + 'm', maskUnits:'userSpaceOnUse', x:0, y:0, width:G.w, height:G.h }, defs);
  var mp = S('path', { d:G.border, fill:'none', stroke:'#fff', 'stroke-width':30, pathLength:1, style:'stroke-dasharray:1;stroke-dashoffset:1' }, mask);
  var root = S('g', { 'clip-path':'url(#' + id + 'c)' }, svg);
  S('rect', { width:G.w, height:G.h, 'class':'km-land0' }, root);
  // أسماء الدول المجاورة
  [['العراق', 110, 430], ['إيران', 1330, 120], ['المملكة العربية السعودية', 480, 1000]].forEach(function(n){ var t = S('text', { x:n[1], y:n[2], 'class':'km-nb' }, root); t.textContent = n[0]; });
  // خطوط الطول ودوائر العرض
  var gg = S('g', null, root);
  GRID.lon.forEach(function(g){ S('line', { x1:g[1], y1:0, x2:g[1], y2:G.h, 'class':'km-grid' }, gg); var t = S('text', { x:g[1], y:36, 'class':'km-gl', 'text-anchor':'middle' }, gg); t.textContent = g[2]; });
  GRID.lat.forEach(function(g){ S('line', { x1:0, y1:g[1], x2:G.w, y2:g[1], 'class':'km-grid' }, gg); var t = S('text', { x:10, y:g[1] - 8, 'class':'km-gl' }, gg); t.textContent = g[2]; });
  S('path', { d:G.kuwait, 'class':'km-kw' }, root);
  var kb = S('text', { x:640, y:560, 'class':'km-kwb' }, root); kb.textContent = 'دولة الكويت';
  S('path', { d:G.sea, 'class':'km-sea' }, root);
  S('path', { d:G.bub, 'class':'km-kw' }, root);
  S('path', { d:G.fal, 'class':'km-kw' }, root);
  var sl = S('text', { x:1290, y:770, 'class':'km-sealb' }, root); sl.textContent = 'الخليج العربي';
  // اتجاه انحدار السطح
  var slope = this.slope = S('g', { 'class':'km-slope' }, root);
  S('path', { d:'M200 640 Q440 600 700 640', 'class':'fl' }, slope);
  S('polygon', { points:'700,606 752,640 700,676', fill:'#6d28d9' }, slope);
  var st = S('text', { x:440, y:575, 'text-anchor':'middle' }, slope); st.textContent = 'ينحدر السطح من الغرب إلى الشرق';
  S('path', { d:G.border, 'class':'km-border', mask:'url(#' + id + 'm)' }, root);
  // العلامات
  this.pins = {}; this.labels = {};
  var pg = S('g', null, root), lg = S('g', null, root); this.fx = S('g', null, root);
  PLACES.forEach(function(p, i){
    var g = S('g', { 'class':'km-pin c-' + p.c, 'data-k':p.k, transform:'translate(' + p.x + ' ' + p.y + ')', tabindex:0, role:'button', 'aria-label':p.n }, pg);
    g.style.setProperty('--i', i);
    var dr = S('g', { 'class':'km-dr' }, g), inn = S('g', { 'class':'km-in' }, dr);
    S('circle', { r:(p.c === 'bay' ? 70 : 46), fill:'transparent' }, inn);
    pinShape(p, inn);
    S('circle', { r:36, 'class':'ring' }, inn);
    self.pins[p.k] = g;
    var t = S('text', { x:p.x + p.dx, y:p.y + p.dy, 'text-anchor':p.la, 'class':'km-lb', 'data-k':p.k }, lg);
    t.textContent = p.n; self.labels[p.k] = t;
  });
  // التفاعل: تحريك وتكبير
  this.vb = { x:0, y:0, w:G.w, h:G.h };
  this._bind();
  var ui = this.ui = H('div', 'km-ui', null, host);
  [['+', 'تكبير', function(){ self.zoomBy(0.7); }], ['−', 'تصغير', function(){ self.zoomBy(1 / 0.7); }], ['⟲', 'إعادة', function(){ self.reset(); }]].forEach(function(b){
    var bt = H('button', '', b[0], ui); bt.type = 'button'; bt.setAttribute('aria-label', b[1]); bt.onclick = b[2];
  });
  this.toastEl = H('div', 'km-toast', '', host);
  if(opts.intro !== false && !reduced()){ host.classList.add('km-drop'); setTimeout(function(){ host.classList.remove('km-drop'); }, 2600); }
  S('animate', { attributeName:'stroke-dashoffset', from:1, to:0, dur:'1.6s', fill:'freeze', begin:'0s' }, mp);
  if(reduced()){ mp.style.strokeDashoffset = 0; }
}
KMap.prototype._pt = function(ev){
  var r = this.svg.getBoundingClientRect(), v = this.vb;
  return { x:v.x + (ev.clientX - r.left) / r.width * v.w, y:v.y + (ev.clientY - r.top) / r.height * v.h, r:r };
};
KMap.prototype._setVB = function(){
  var v = this.vb;
  v.w = Math.min(G.w, Math.max(G.w / 6, v.w)); v.h = v.w * G.h / G.w;
  v.x = Math.max(0, Math.min(G.w - v.w, v.x)); v.y = Math.max(0, Math.min(G.h - v.h, v.y));
  this.svg.setAttribute('viewBox', v.x + ' ' + v.y + ' ' + v.w + ' ' + v.h);
  this.svg.style.touchAction = (v.w < G.w - 2) ? 'none' : 'pan-y';
};
KMap.prototype.zoomBy = function(f, cx, cy){
  var v = this.vb; if(cx == null){ cx = v.x + v.w / 2; cy = v.y + v.h / 2; }
  var nw = Math.min(G.w, Math.max(G.w / 6, v.w * f)), k = nw / v.w;
  v.x = cx - (cx - v.x) * k; v.y = cy - (cy - v.y) * k; v.w = nw; this._setVB();
};
KMap.prototype._anim = function(to){
  var self = this, v = this.vb, f = { x:v.x, y:v.y, w:v.w }, t0 = null, dur = reduced() ? 1 : 520;
  cancelAnimationFrame(this._raf);
  function step(t){
    if(t0 == null){ t0 = t; }
    var u = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - u, 3);
    v.x = f.x + (to.x - f.x) * e; v.y = f.y + (to.y - f.y) * e; v.w = f.w + (to.w - f.w) * e; self._setVB();
    if(u < 1){ self._raf = requestAnimationFrame(step); }
  }
  this._raf = requestAnimationFrame(step);
};
KMap.prototype.reset = function(){ this._anim({ x:0, y:0, w:G.w }); };
KMap.prototype.focus = function(x, y, zoom){
  var w = G.w / (zoom || 2.2), h = w * G.h / G.w;
  this._anim({ x:Math.max(0, Math.min(G.w - w, x - w / 2)), y:Math.max(0, Math.min(G.h - h, y - h / 2)), w:w });
};
KMap.prototype._bind = function(){
  var self = this, svg = this.svg, ptrs = {}, start = null, moved = false, pinch0 = null;
  svg.addEventListener('pointerdown', function(e){
    ptrs[e.pointerId] = { x:e.clientX, y:e.clientY }; moved = false;
    var n = Object.keys(ptrs).length;
    if(n === 1){ start = { x:e.clientX, y:e.clientY, vx:self.vb.x, vy:self.vb.y }; }
    if(n === 2){ var a = Object.keys(ptrs).map(function(k){ return ptrs[k]; }); pinch0 = { d:Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y), w:self.vb.w }; moved = true; }
  });
  svg.addEventListener('pointermove', function(e){
    if(!ptrs[e.pointerId]){ return; }
    ptrs[e.pointerId] = { x:e.clientX, y:e.clientY };
    var keys = Object.keys(ptrs), r = svg.getBoundingClientRect();
    if(keys.length === 2 && pinch0){
      var a = keys.map(function(k){ return ptrs[k]; }), d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
      if(d > 10){
        var cx = ((a[0].x + a[1].x) / 2 - r.left) / r.width * self.vb.w + self.vb.x, cy = ((a[0].y + a[1].y) / 2 - r.top) / r.height * self.vb.h + self.vb.y;
        self.zoomBy(pinch0.w / d * pinch0.d / self.vb.w, cx, cy);
      }
      return;
    }
    if(keys.length === 1 && start && self.vb.w < G.w - 2){
      var dx = e.clientX - start.x, dy = e.clientY - start.y;
      if(Math.abs(dx) + Math.abs(dy) > 7){ moved = true; }
      if(moved){ self.vb.x = start.vx - dx / r.width * self.vb.w; self.vb.y = start.vy - dy / r.height * self.vb.h; self._setVB(); }
    } else if(keys.length === 1 && start && Math.abs(e.clientX - start.x) + Math.abs(e.clientY - start.y) > 9){ moved = true; }
  });
  function end(e){
    var was = ptrs[e.pointerId]; delete ptrs[e.pointerId];
    if(Object.keys(ptrs).length < 2){ pinch0 = null; }
    if(was && !moved && e.type === 'pointerup' && Object.keys(ptrs).length === 0){ self._tap(e); }
    if(Object.keys(ptrs).length === 0){ start = null; }
  }
  svg.addEventListener('pointerup', end); svg.addEventListener('pointercancel', end);
  svg.addEventListener('wheel', function(e){
    if(!e.ctrlKey && !e.shiftKey && self.vb.w >= G.w - 2 && !self.opts.wheelZoom){ return; }
    e.preventDefault(); var p = self._pt(e); self.zoomBy(e.deltaY < 0 ? 0.85 : 1 / 0.85, p.x, p.y);
  }, { passive:false });
  svg.addEventListener('keydown', function(e){
    if((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute && e.target.getAttribute('data-k')){ e.preventDefault(); self._pick(e.target.getAttribute('data-k')); }
  });
};
KMap.prototype._tap = function(e){
  if(this.locked){ return; }
  var p = this._pt(e), thr = 36 * this.vb.w / p.r.width * (p.r.width < 500 ? 1.15 : 1), best = null, bd = 1e9;
  var self = this;
  PLACES.forEach(function(q){
    var g = self.pins[q.k]; if(g.classList.contains('off')){ return; }
    if(self.vb && self.dimmed && !g.classList.contains('focus')){ return; }
    var d;
    if(q.c === 'bay'){ // مستطيل الجون: المسافة إلى حافة المستطيل (٠ داخله) وهامش ٢٥ وحدة، فلا يسرق لمسة دبوس مجاور (مثل جال الزور)
      var rx = Math.max(BAY.x - p.x, 0, p.x - (BAY.x + BAY.w)), ry = Math.max(BAY.y - p.y, 0, p.y - (BAY.y + BAY.h));
      d = Math.hypot(rx, ry); if(d > 25){ return; }
    } else { d = Math.hypot(p.x - q.x, p.y - q.y); }
    if(q.alt){ q.alt.forEach(function(a){ d = Math.min(d, Math.hypot(p.x - a[0], p.y - a[1])); }); }
    if(d < bd){ bd = d; best = q; }
  });
  if(best && bd <= thr + 14){ this._pick(best.k); }
};
KMap.prototype._pick = function(k){
  if(this.locked){ return; }
  if(this.tapFn){ this.tapFn(k); }
};
KMap.prototype.onPick = function(fn){ this.tapFn = fn; return this; };
KMap.prototype.showLabels = function(on){ this.host.classList.toggle('nolabels', !on); };
KMap.prototype.showSlope = function(on){ this.slope.classList.toggle('on', !!on); };
KMap.prototype.filter = function(cats){
  var self = this;
  PLACES.forEach(function(p){
    var off = cats && cats.indexOf(p.c) < 0;
    self.pins[p.k].classList.toggle('off', !!off); self.labels[p.k].style.display = off ? 'none' : '';
  });
};
KMap.prototype.select = function(k){
  var self = this;
  Object.keys(this.pins).forEach(function(x){ self.pins[x].classList.toggle('sel', x === k); });
};
KMap.prototype.spot = function(k, on){
  var self = this;
  this.dimmed = !!on; this.host.classList.toggle('dim', !!on);
  Object.keys(this.pins).forEach(function(x){
    var f = on && x === k; self.pins[x].classList.toggle('focus', f); self.labels[x].classList.toggle('focus', f);
  });
  this.clearRip();
  if(on){ this.ripple(k); }
};
KMap.prototype.ripple = function(k){
  var p = byKey[k], g = this.pins[k];
  var cx = p.x, cy = p.y;
  for(var i = 1; i <= 3; i++){ S('circle', { cx:cx, cy:cy, r:24, 'class':'km-rip r' + i + ' rip' }, this.fx); }
};
KMap.prototype.clearRip = function(){ var r = this.fx.querySelectorAll('.rip'); for(var i = 0; i < r.length; i++){ r[i].parentNode.removeChild(r[i]); } };
KMap.prototype.mark = function(k, ok){
  var g = this.pins[k]; g.classList.remove('ok', 'bad'); void g.getBoundingClientRect();
  g.classList.add(ok ? 'ok' : 'bad');
  if(!ok){ var self = this; setTimeout(function(){ g.classList.remove('bad'); }, 900); }
  else { this.burst(k); this.clearRip(); }
};
KMap.prototype.burst = function(k){
  if(reduced()){ return; }
  var p = byKey[k], bg = S('g', { 'class':'km-burst' }, this.fx), cols = ['#f59e0b', '#16a34a', '#2563eb', '#db2777', '#9333ea'];
  for(var i = 0; i < 16; i++){
    var a = i / 16 * Math.PI * 2, d = 70 + Math.random() * 60;
    var c = S('circle', { cx:p.x, cy:p.y, r:7 + Math.random() * 5 }, bg);
    c.setAttribute('class', ''); c.style.setProperty('--c', cols[i % cols.length]);
    c.style.setProperty('--dx', Math.cos(a) * d + 'px'); c.style.setProperty('--dy', Math.sin(a) * d + 'px');
    c.style.animation = 'kmBurst .85s cubic-bezier(.1,.7,.3,1) forwards'; c.style.fill = cols[i % cols.length];
    c.style.transformBox = 'fill-box'; c.style.transformOrigin = 'center';
  }
  setTimeout(function(){ if(bg.parentNode){ bg.parentNode.removeChild(bg); } }, 1000);
};
KMap.prototype.reveal = function(k){ this.labels[k].classList.add('on'); };
KMap.prototype.clearMarks = function(){
  var self = this;
  Object.keys(this.pins).forEach(function(x){ self.pins[x].classList.remove('ok', 'bad', 'sel'); self.labels[x].classList.remove('on'); });
  this.clearRip();
};
KMap.prototype.toast = function(msg, cls){
  var t = this.toastEl; t.textContent = msg; t.className = 'km-toast show ' + (cls || '');
  clearTimeout(this._tt); this._tt = setTimeout(function(){ t.classList.remove('show'); }, 2200);
};

/* ============================ خريطة الرياح (شكل ٢٣) ============================ */
var WINDS = {"nw": {"n": "الرياح الشمالية الغربية", "short": "شمالية غربية", "from": "الشمال الغربي", "to": "الجنوب الشرقي", "col": "#4f9d3a", "body": "تهب من جهة الشمال الغربي، وهي الرياح السائدة في دولة الكويت. تتميز بأنها جافة ونشطة شديدة الحرارة في فصل الصيف، وباردة في فصل الشتاء."}, "ne": {"n": "الرياح الشمالية الشرقية", "short": "شمالية شرقية", "from": "الشمال الشرقي", "to": "الجنوب الغربي", "col": "#2f6fd6", "body": "ظهرت في شكل (٢٣) ضمن اتجاهات الرياح السائدة التي تهب على دولة الكويت، وتهب من جهة الشمال الشرقي."}, "se": {"n": "الرياح الجنوبية الشرقية (رياح الكوس)", "short": "جنوبية شرقية", "from": "الجنوب الشرقي", "to": "الشمال الغربي", "col": "#e8743b", "body": "رياح جنوبية شرقية رطبة ودافئة؛ ترتفع معها نسبة الرطوبة ودرجات الحرارة صيفاً، وتتكاثر السحب وتتساقط الأمطار شتاءً."}, "samoom": {"n": "رياح السموم", "short": "السموم", "from": "الشمال الغربي", "col": "#b45309", "body": "رياح شمالية غربية جافة تنشط في فصل الصيف، مسببة ارتفاع درجات الحرارة وإثارة العواصف الترابية."}, "saraya": {"n": "السرايات", "short": "السرايات", "col": "#7c3aed", "body": "عواصف رعدية محلية مفاجئة تحدث غالباً من أواخر الربيع حتى أوائل الصيف، وتكون مصحوبة بالغبار والرياح القوية والأمطار الغزيرة."}};
/* الأسهم مأخوذة من قياسات شكل (٢٣): [ذيل x, ذيل y, رأس x, رأس y] — الزوايا: ش.غ ≈ ٤٠° نحو الجنوب الشرقي، ش.ش ≈ ٤٧° نحو الجنوب الغربي، ج.ش ≈ ٢٠° نحو الغرب (ثلاثة أسهم متوازية لكل نوع) */
var WARROW = {
  nw:{ ar:[[184,97,375,259],[169,161,360,323],[142,231,333,393]], tag:[175,52] },
  ne:{ ar:[[1100,22,930,205],[1165,67,995,250],[1230,114,1060,297]], tag:[1318,215] },
  se:{ ar:[[1198,727,944,635],[1254,814,1000,722],[1154,868,900,776]], tag:[1318,930] }
};
Object.keys(WARROW).forEach(function(k){
  var a = WARROW[k], sx = 0, sy = 0, n = 0;
  a.ar.forEach(function(r){ sx += r[0] + r[2]; sy += r[1] + r[3]; n += 2; });
  a.cx = sx / n; a.cy = sy / n;
});
function KWind(host, opts){
  injectCSS();
  opts = opts || {};
  var self = this, id = 'kw' + (++uid);
  this.host = host; this.opts = opts; this.tapFn = null; this.locked = false; this.id = id;
  host.innerHTML = ''; host.classList.add('km');
  var svg = this.svg = S('svg', { viewBox:'0 0 ' + G.w + ' ' + G.h, 'class':'km-svg', role:'img', 'aria-label':'خريطة اتجاهات الرياح السائدة في الكويت' }, host);
  svg.style.touchAction = 'pan-y';
  var defs = S('defs', null, svg), clip = S('clipPath', { id:id + 'c' }, defs); S('rect', { width:G.w, height:G.h }, clip);
  var root = S('g', { 'clip-path':'url(#' + id + 'c)' }, svg);
  S('rect', { width:G.w, height:G.h, 'class':'km-land0' }, root);
  [['العراق', 110, 430], ['إيران', 1395, 52], ['المملكة العربية السعودية', 370, 1010]].forEach(function(n){ var t = S('text', { x:n[1], y:n[2], 'class':'km-nb' }, root); t.textContent = n[0]; });
  S('path', { d:G.kuwait, 'class':'km-kw' }, root);
  var kb = S('text', { x:640, y:610, 'class':'km-kwb', style:'font-size:72px;opacity:.45' }, root); kb.textContent = 'دولة الكويت';
  S('path', { d:G.sea, 'class':'km-sea' }, root);
  S('path', { d:G.bub, 'class':'km-kw' }, root); S('path', { d:G.fal, 'class':'km-kw' }, root);
  var sl = S('text', { x:1300, y:610, 'class':'km-sealb' }, root); sl.textContent = 'الخليج العربي';
  S('path', { d:G.border, 'class':'km-border', style:'opacity:.9' }, root);
  // بوصلة
  var cp = S('g', { transform:'translate(150 800)' }, root);
  S('circle', { r:92, fill:'#fffaf0', stroke:'#8a7550', 'stroke-width':3, opacity:.95 }, cp);
  S('polygon', { points:'0,-80 14,0 0,80 -14,0', fill:'#334155' }, cp);
  S('polygon', { points:'-80,0 0,-14 80,0 0,14', fill:'#94a3b8' }, cp);
  [['ش', 0, -106], ['ج', 0, 134], ['ق', 112, 12], ['غ', -112, 12]].forEach(function(l){ var t = S('text', { x:l[1], y:l[2], 'text-anchor':'middle', style:'font:900 34px Cairo,sans-serif;fill:#1b2430' }, cp); t.textContent = l[0]; });
  this.arrows = {}; this.fxg = S('g', null, root);
  this.wl = S('g', null, root);
  Object.keys(WARROW).forEach(function(k){ self._arrow(k, root); });
  root.appendChild(this.wl);
  this.fx = S('g', null, root);
  this.toastEl = H('div', 'km-toast', '', host);
  var sv = svg;
  sv.addEventListener('click', function(e){
    if(self.locked){ return; }
    var t = e.target; while(t && t !== sv){ if(t.getAttribute && t.getAttribute('data-w')){ self._pick(t.getAttribute('data-w')); return; } t = t.parentNode; }
    var r = sv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * G.w, y = (e.clientY - r.top) / r.height * G.h, best = null, bd = 1e9;
    Object.keys(WARROW).forEach(function(k){ var a = WARROW[k], d = Math.hypot(x - a.cx, y - a.cy); if(d < bd){ bd = d; best = k; } });
    if(best && bd < 230){ self._pick(best); }
  });
  if(!reduced()){ host.classList.add('km-drop'); setTimeout(function(){ host.classList.remove('km-drop'); }, 1800); }
}
KWind.prototype._arrow = function(k, root){
  var a = WARROW[k], w = WINDS[k], g = S('g', { 'class':'kw-arrow', 'data-w':k, style:'--c:' + w.col, tabindex:0, role:'button', 'aria-label':w.n }, root);
  var m = a.ar[1], mdx = m[2] - m[0], mdy = m[3] - m[1], ml = Math.hypot(mdx, mdy);
  g.style.setProperty('--ix', (-mdx / ml * 70).toFixed(1) + 'px'); g.style.setProperty('--iy', (-mdy / ml * 70).toFixed(1) + 'px');
  a.ar.forEach(function(r){
    var tx = r[0], ty = r[1], hx = r[2], hy = r[3], L = Math.hypot(hx - tx, hy - ty), ux = (hx - tx) / L, uy = (hy - ty) / L, nx = -uy, ny = ux;
    var hs = L * 0.105 / 2, hw = L * 0.22 / 2, hl = L * 0.25, bx = hx - ux * hl, by = hy - uy * hl;
    function poly(dx, dy){
      var pts = [[tx, ty, hs], [bx, by, hs], [bx, by, hw], [hx, hy, 0], [bx, by, -hw], [bx, by, -hs], [tx, ty, -hs]];
      return pts.map(function(p){ return (p[0] + nx * p[2] + dx).toFixed(1) + ',' + (p[1] + ny * p[2] + dy).toFixed(1); }).join(' ');
    }
    S('polygon', { points:poly(4, 7), 'class':'side' }, g);
    S('polygon', { points:poly(0, 0), 'class':'top' }, g);
    S('line', { x1:tx + ux * 22, y1:ty + uy * 22, x2:bx - ux * 8, y2:by - uy * 8, 'class':'flow' }, g);
    S('line', { x1:tx, y1:ty, x2:hx, y2:hy, stroke:'transparent', 'stroke-width':84, 'stroke-linecap':'round' }, g);
  });
  var tw = (w.short.length * 20 + 50), tgx = Math.max(tw / 2 + 12, Math.min(G.w - tw / 2 - 12, a.tag[0])), tgy = Math.max(40, Math.min(G.h - 40, a.tag[1]));
  var tag = S('g', { 'class':'kw-tag-g', transform:'translate(' + tgx + ' ' + tgy + ')', 'data-w':k }, this.wl);
  S('rect', { x:-tw / 2, y:-30, width:tw, height:52, rx:26, 'class':'kw-tagbg', style:'--c:' + w.col }, tag);
  var t = S('text', { x:0, y:8, 'class':'kw-tag' }, tag); t.textContent = w.short;
  this.arrows[k] = { g:g, tag:tag };
};
KWind.prototype._pick = function(k){ if(this.tapFn){ this.tapFn(k); } };
KWind.prototype.toast = function(msg, cls){ var t = this.toastEl; t.textContent = msg; t.className = 'km-toast show ' + (cls || ''); clearTimeout(this._tt); this._tt = setTimeout(function(){ t.className = 'km-toast'; }, 1800); };
KWind.prototype.onPick = function(fn){ this.tapFn = fn; return this; };
KWind.prototype.showTags = function(on){ this.wl.style.display = on ? '' : 'none'; };
KWind.prototype.spot = function(k, on){
  var self = this; this.host.classList.toggle('dim', !!on);
  Object.keys(this.arrows).forEach(function(x){
    var f = on && (x === k); self.arrows[x].g.classList.toggle('focus', f); self.arrows[x].tag.style.opacity = (on && !f) ? .12 : 1;
  });
};
KWind.prototype.select = function(k){ var self = this; Object.keys(this.arrows).forEach(function(x){ self.arrows[x].g.classList.toggle('sel', x === k); }); };
KWind.prototype.mark = function(k, ok){
  var g = this.arrows[k] && this.arrows[k].g; if(!g){ return; }
  g.style.transition = 'filter .3s'; g.style.filter = ok ? 'drop-shadow(0 0 14px #22c55e)' : 'drop-shadow(0 0 14px #ef4444)';
  setTimeout(function(){ g.style.filter = ''; }, 900);
};
function popAt(parent, x, y, extra){ var o = S('g', { transform:'translate(' + x + ' ' + y + ')' }, parent), m = S('g', { 'class':'kw-pop' }, o); return extra ? S('g', { 'class':extra }, m) : m; }
KWind.prototype.clearFx = function(){ while(this.fx.firstChild){ this.fx.removeChild(this.fx.firstChild); } };
KWind.prototype.effect = function(kind, opt){
  this.clearFx(); var fx = this.fx, i, g;
  if(reduced() && kind !== 'saraya'){ /* يبقى الأثر ثابتاً */ }
  if(kind === 'samoom'){
    g = S('g', { 'class':'kw-dust' }, fx);
    for(i = 0; i < 26; i++){
      var c = S('circle', { cx:200 + Math.random() * 520, cy:120 + Math.random() * 360, r:6 + Math.random() * 9 }, g);
      c.style.setProperty('--dx', (260 + Math.random() * 200) + 'px'); c.style.setProperty('--dy', (200 + Math.random() * 160) + 'px');
      c.style.animationDelay = (Math.random() * 2.6) + 's'; c.style.animationDuration = (2 + Math.random() * 1.6) + 's';
    }
    var s = popAt(fx, 880, 300, 'kw-sun');
    S('circle', { r:44, fill:'#f59e0b', stroke:'#b45309', 'stroke-width':4 }, s);
    for(i = 0; i < 12; i++){ var an = i / 12 * Math.PI * 2; S('line', { x1:Math.cos(an) * 58, y1:Math.sin(an) * 58, x2:Math.cos(an) * 82, y2:Math.sin(an) * 82, stroke:'#f59e0b', 'stroke-width':7, 'stroke-linecap':'round' }, s); }
  } else if(kind === 'nw'){
    var snow = opt && opt.season === 'w';
    if(!snow){
      var s2 = popAt(fx, 880, 300, 'kw-sun');
      S('circle', { r:44, fill:'#f59e0b', stroke:'#b45309', 'stroke-width':4 }, s2);
      for(i = 0; i < 12; i++){ var an2 = i / 12 * Math.PI * 2; S('line', { x1:Math.cos(an2) * 58, y1:Math.sin(an2) * 58, x2:Math.cos(an2) * 82, y2:Math.sin(an2) * 82, stroke:'#f59e0b', 'stroke-width':7, 'stroke-linecap':'round' }, s2); }
    } else {
      g = S('g', { 'class':'kw-snow' }, fx);
      for(i = 0; i < 22; i++){
        var f = S('circle', { cx:160 + Math.random() * 560, cy:100 + Math.random() * 120, r:6 + Math.random() * 6 }, g);
        f.style.setProperty('--dx', (60 + Math.random() * 80) + 'px'); f.style.setProperty('--dy', (200 + Math.random() * 200) + 'px');
        f.style.animationDelay = (Math.random() * 3) + 's';
      }
      var sn = S('text', { x:0, y:40, 'text-anchor':'middle', style:'font-size:110px' }, popAt(fx, 880, 300)); sn.textContent = '❄';
    }
  } else if(kind === 'kaws' || kind === 'saraya'){
    var cx = kind === 'kaws' ? 900 : 640, cy = kind === 'kaws' ? 510 : 420;
    var cl = popAt(fx, cx, cy);
    S('path', { d:'M-90 30 Q-120 30 -118 0 Q-116 -30 -84 -30 Q-80 -80 -20 -80 Q30 -90 50 -50 Q110 -56 110 -6 Q130 30 90 30 Z', fill:(kind === 'saraya' ? '#475569' : '#94a3b8'), stroke:'#334155', 'stroke-width':4 }, cl);
    if(kind === 'saraya'){ S('polygon', { points:'8,10 -30,70 -2,70 -20,125 40,52 12,52 34,10', 'class':'kw-bolt' }, cl); }
    g = S('g', { 'class':'kw-rain', transform:'translate(' + cx + ' ' + (cy + 40) + ')' }, fx);
    for(i = 0; i < 12; i++){ var l = S('line', { x1:-90 + i * 17, y1:0, x2:-98 + i * 17, y2:26 }, g); l.style.animationDelay = (i % 5) * 0.2 + 's'; }
  }
};

/* ====================== بناء الأسئلة والتحقق منها ====================== */
var GROUP = { f:['plateau', 'hill', 'plain', 'valley'], s:['dune', 'khabra'], c:['island', 'head', 'khor', 'bay'] };
var WORDER = ['nw', 'ne', 'se'];
function groupOf(cat){ return CATS[cat].g; }
function placeName(k){ return byKey[k].n; }
function kindOpts(k){
  var c = byKey[k].c, others = shuf(Object.keys(CATS).filter(function(x){ return x !== c; })).slice(0, 3);
  var all = shuf([c].concat(others));
  return { opts:all.map(function(x){ return CATS[x].n; }), a:all.indexOf(c) };
}
function nameOpts(k){
  var p = byKey[k], pool = PLACES.filter(function(q){ return q.k !== k; });
  var same = shuf(pool.filter(function(q){ return q.c === p.c; })), grp = shuf(pool.filter(function(q){ return q.c !== p.c && groupOf(q.c) === groupOf(p.c); })), rest = shuf(pool.filter(function(q){ return groupOf(q.c) !== groupOf(p.c); }));
  var d = same.concat(grp).concat(rest).slice(0, 3), all = shuf([p].concat(d));
  return { opts:all.map(function(q){ return q.n; }), a:all.indexOf(p) };
}
function windKindOpts(){ return { opts:WORDER.map(function(x){ return WINDS[x].n; }), a:null }; }
function questionText(q){
  if(q.map === 'wind'){
    if(q.mode === 'locate'){ return 'اضغط على السهم الذي يمثل «' + WINDS[q.target].n + '» على الخريطة'; }
    if(q.mode === 'name'){ return 'ما اسم الرياح التي يمثلها السهم النابض على الخريطة؟'; }
    if(q.mode === 'from'){ return 'من أي جهة تهب الرياح التي يمثلها السهم النابض على الخريطة؟'; }
  } else {
    if(q.mode === 'locate'){ return 'اضغط على «' + placeName(q.target) + '» على الخريطة'; }
    if(q.mode === 'name'){ return 'ما اسم المعلم الذي يشير إليه المؤشر النابض على الخريطة؟'; }
    if(q.mode === 'kind'){ return 'حسب مفتاح الخريطة، ما نوع المعلم الذي يشير إليه المؤشر النابض؟'; }
  }
  return q.q || '';
}
function answerText(q){
  if(q.map === 'wind'){
    if(q.mode === 'from'){ return WINDS[q.target].from; }
    return WINDS[q.target].n;
  }
  if(q.mode === 'kind'){ return CATS[byKey[q.target].c].n; }
  return placeName(q.target);
}
function explain(q){
  if(q.map === 'wind'){ var w = WINDS[q.target]; return w.body; }
  var p = byKey[q.target]; return p.n + ': ' + p.b;
}

/* ============ عرض سؤال خريطة واحد (يُستخدم في اختبر نفسك وفي التحدّي) ============ */
function ask(host, q, done, opts){
  injectCSS(); opts = opts || {};
  host.innerHTML = '';
  var wrap = H('div', 'km-q', null, host), mh = H('div', '', null, wrap), finished = false;
  var wind = q.map === 'wind', tries = 0;
  var m = wind ? new KWind(mh, { }) : new KMap(mh, { labels:false, intro:false });
  if(!wind){ var ui = mh.querySelector('.km-ui'); }
  var hint = H('p', 'km-hint', '', wrap);
  function finish(credit, headline, detail){
    if(finished){ return; } finished = true;
    m.locked = true;
    if(done){ done(credit, headline, detail || explain(q)); }
  }
  if(wind){
    m.showTags(false);
    var w = WINDS[q.target];
    if(q.mode === 'locate'){
      hint.textContent = 'اضغط على السهم المناسب (لديك محاولتان)';
      m.onPick(function(k){
        if(finished){ return; }
        tries++;
        if(k === q.target){ m.mark(k, true); m.spot(k, true); m.showTags(true); m.toast('أحسنت! هذه «' + WINDS[k].n + '»', 'ok'); finish(tries === 1 ? 1 : 0.5, 'إجابة صحيحة ✓'); }
        else { m.mark(k, false); m.toast('هذه «' + WINDS[k].n + '» — حاول مرة أخرى', 'bad');
          if(tries >= 2){ m.spot(q.target, true); m.showTags(true); finish(0, 'إجابة غير صحيحة', 'الصحيح: ' + WINDS[q.target].n + ' — ' + WINDS[q.target].body); } }
      });
    } else {
      m.spot(q.target, true);
      var o = q.mode === 'from' ? { opts:['الشمال الغربي', 'الشمال الشرقي', 'الجنوب الشرقي', 'الجنوب الغربي'] } : windKindOpts();
      var correct = answerText(q);
      hint.textContent = 'تأمّل السهم المظلَّل على الخريطة (شكل ٢٣)';
      var ob = H('div', 'km-q-opts', null, wrap); if(o.opts.length === 3){ ob.style.gridTemplateColumns = '1fr'; }
      shuf(o.opts).forEach(function(t){
        var b = H('button', '', t, ob); b.type = 'button';
        b.onclick = function(){
          if(finished){ return; }
          var ok = (t === correct);
          Array.prototype.forEach.call(ob.children, function(x){ x.disabled = true; if(x.textContent === correct){ x.classList.add('good'); } });
          if(!ok){ b.classList.add('bad'); }
          m.mark(q.target, ok); m.showTags(true);
          finish(ok ? 1 : 0, ok ? 'إجابة صحيحة ✓' : 'إجابة غير صحيحة', ok ? '' : 'الإجابة الصحيحة: ' + correct);
        };
      });
    }
    return m;
  }
  /* خريطة المظاهر */
  var p = byKey[q.target];
  if(q.mode === 'locate'){
    var cats = q.cats || GROUP[groupOf(p.c)];
    m.filter(cats);
    hint.textContent = 'اضغط على العلامة المناسبة (لديك محاولتان)';
    legendRow(wrap, cats);
    m.onPick(function(k){
      if(finished){ return; }
      tries++;
      if(k === q.target){ m.mark(k, true); m.reveal(k); m.toast('أحسنت! هذه «' + placeName(k) + '»', 'ok'); finish(tries === 1 ? 1 : 0.5, 'إجابة صحيحة ✓'); }
      else { m.mark(k, false); m.reveal(k); m.toast('هذه «' + placeName(k) + '» — حاول مرة أخرى', 'bad');
        if(tries >= 2){ m.mark(q.target, true); m.reveal(q.target); m.focus(p.x, p.y, 1.7); finish(0, 'إجابة غير صحيحة', 'مكانها موضّح على الخريطة. ' + explain(q)); } }
    });
  } else {
    m.spot(q.target, true);
    var o2 = q.mode === 'kind' ? kindOpts(q.target) : nameOpts(q.target);
    if(q.mode === 'kind'){ legendRow(wrap, Object.keys(CATS)); }
    hint.textContent = q.mode === 'kind' ? 'استعن بمفتاح الخريطة (الأشكال والألوان)' : 'انظر إلى موضع المؤشر على الخريطة';
    var ob2 = H('div', 'km-q-opts', null, wrap);
    o2.opts.forEach(function(t, i){
      var b = H('button', '', t, ob2); b.type = 'button';
      b.onclick = function(){
        if(finished){ return; }
        var ok = (i === o2.a);
        Array.prototype.forEach.call(ob2.children, function(x, j){ x.disabled = true; if(j === o2.a){ x.classList.add('good'); } });
        if(!ok){ b.classList.add('bad'); }
        m.mark(q.target, ok); m.reveal(q.target);
        finish(ok ? 1 : 0, ok ? 'إجابة صحيحة ✓' : 'إجابة غير صحيحة', ok ? '' : 'الإجابة الصحيحة: ' + o2.opts[o2.a] + ' — ' + explain(q));
      };
    });
  }
  return m;
}

/* ============ مشغّل جولات التحدّي ============ */
function surfaceQuestions(cats, n){
  var ks = PLACES.filter(function(p){ return !cats || cats.indexOf(p.c) >= 0; }).map(function(p){ return p.k; });
  var qs = [];
  shuf(ks).forEach(function(k){
    var modes = ['locate', 'name', 'kind']; if(CATS[byKey[k].c].g === 's'){ modes = ['locate', 'name', 'kind']; }
    qs.push({ type:'map', map:'surface', mode:modes[Math.floor(Math.random() * modes.length)], target:k });
  });
  return shuf(qs).slice(0, n || 10);
}
function windQuestions(n){
  var qs = [];
  WORDER.forEach(function(k){ ['locate', 'name', 'from'].forEach(function(m){ qs.push({ type:'map', map:'wind', mode:m, target:k }); }); });
  return shuf(qs).slice(0, n || 9);
}


/* ============ مشغّل جولات التحدّي (واجهة كاملة) ============ */
function confetti(){
  if(reduced()){ return; }
  var c = H('div', 'kr-conf', null, document.body), cols = ['#f59e0b', '#16a34a', '#2563eb', '#db2777', '#9333ea', '#e8743b'];
  for(var i = 0; i < 46; i++){ var p = H('i', '', null, c); p.style.left = Math.random() * 100 + '%'; p.style.background = cols[i % cols.length]; p.style.animationDuration = (2.2 + Math.random() * 2) + 's'; p.style.animationDelay = Math.random() * 0.7 + 's'; }
  setTimeout(function(){ if(c.parentNode){ c.parentNode.removeChild(c); } }, 5200);
}
function runner(host, qs, o){
  injectCSS(); o = o || {};
  var i = 0, score = 0, streak = 0, miss = [], root = H('div', 'kr', null, host);
  host.innerHTML = ''; host.appendChild(root); root.style.position = 'relative';
  var top = H('div', 'kr-top', null, root), prog = H('span', '', '', top), st = H('span', 'kr-st', '', top);
  var bar = H('div', 'kr-bar', null, root), bi = H('i', '', null, bar);
  var qt = H('p', 'kr-q', '', root), area = H('div', '', null, root), fb = H('div', '', null, root), nx = H('button', 'kr-btn', '', root);
  nx.type = 'button'; nx.style.display = 'none';
  function stat(){
    st.innerHTML = ''; if(streak >= 2){ var f = H('span', 'kr-fire', '🔥', st); H('span', '', arn(streak) + ' متتالية', st); }
    H('span', '', 'النقاط: ' + arn(score % 1 ? score.toFixed(1).replace('.', '٫') : score), st);
  }
  function show(){
    var q = qs[i]; fb.className = ''; fb.innerHTML = ''; nx.style.display = 'none';
    prog.textContent = 'السؤال ' + arn(i + 1) + ' من ' + arn(qs.length); bi.style.width = (i / qs.length * 100) + '%'; stat();
    qt.textContent = questionText(q);
    ask(area, q, function(credit, headline, detail){
      score += credit; if(credit >= 0.999){ streak++; } else { streak = 0; if(credit === 0){ miss.push(q); } }
      fb.className = 'kr-fb ' + (credit >= 0.999 ? 'ok' : (credit > 0 ? 'part' : 'bad')); fb.textContent = headline;
      if(credit > 0){ fb.textContent = headline + (credit < 0.999 ? ' (نصف نقطة)' : ''); }
      if(detail){ var s = H('small', '', detail, fb); }
      if(credit > 0){ var pt = H('span', 'kr-pts', credit >= 0.999 ? '+١' : '+٠٫٥', root); pt.style.left = '50%'; pt.style.top = '38%'; setTimeout(function(){ if(pt.parentNode){ pt.parentNode.removeChild(pt); } }, 1100); }
      bi.style.width = ((i + 1) / qs.length * 100) + '%'; stat();
      nx.textContent = (i === qs.length - 1) ? 'عرض النتيجة ←' : 'السؤال التالي ←'; nx.style.display = '';
      try{ nx.scrollIntoView({ behavior:'smooth', block:'nearest' }); }catch(e){}
    });
  }
  nx.onclick = function(){ i++; if(i >= qs.length){ result(); } else { show(); } };
  function result(){
    root.innerHTML = '';
    var pct = Math.round(score / qs.length * 100), res = H('div', 'kr-res', null, root);
    var ring = H('div', 'kr-ring', null, res); ring.innerHTML = '<svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="52"></circle><circle class="fg" id="krfg" cx="60" cy="60" r="52"></circle></svg><b>' + arn(pct) + '٪</b>';
    var stars = pct >= 90 ? 3 : (pct >= 70 ? 2 : (pct >= 40 ? 1 : 0)), sd = H('div', 'kr-stars', null, res);
    for(var s = 0; s < 3; s++){ var sp = H('span', '', s < stars ? '⭐' : '☆', sd); sp.style.animationDelay = (0.3 + s * 0.25) + 's'; }
    H('div', 'kr-q', pct >= 90 ? 'ممتاز! أنت تقرأ الخريطة كالمحترفين' : (pct >= 70 ? 'جيد جدًا، أنت قريب من الإتقان' : (pct >= 40 ? 'بداية جيدة، راجع الأماكن التي أخطأت فيها' : 'تحتاج إلى مزيد من التدريب، جرّب وضع الاستكشاف أولًا')), res);
    if(miss.length){
      var ms = H('div', 'kr-miss', null, res); H('b', '', 'أماكن تحتاج إلى مراجعة:', ms);
      miss.forEach(function(q){ var d = H('div', '', null, ms); d.textContent = answerText(q) + (q.map === 'wind' ? '' : ' — ' + CATS[byKey[q.target].c].n); });
    }
    var ac = H('div', '', null, res); ac.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;justify-content:center';
    var again = H('button', 'kr-btn', 'جولة جديدة', ac); again.type = 'button'; again.onclick = function(){ if(o.onAgain){ o.onAgain(); } };
    if(o.onExplore){ var ex = H('button', 'kr-btn alt', 'ارجع للاستكشاف', ac); ex.type = 'button'; ex.onclick = o.onExplore; }
    setTimeout(function(){ var fg = document.getElementById('krfg'); if(fg){ fg.style.strokeDashoffset = 326.7 * (1 - pct / 100); } }, 80);
    if(pct >= 80){ confetti(); }
    if(o.onFinish){ o.onFinish(pct, miss); }
  }
  show();
  return root;
}

global.KMAP = {
  G:G, CATS:CATS, PLACES:PLACES, WINDS:WINDS, byKey:byKey, arn:arn, KMap:KMap, KWind:KWind,
  ask:ask, answerText:answerText, questionText:questionText, explain:explain,
  surfaceQuestions:surfaceQuestions, windQuestions:windQuestions, runner:runner, confetti:confetti, legendRow:legendRow, injectCSS:injectCSS, shuf:shuf
};
})(window);
