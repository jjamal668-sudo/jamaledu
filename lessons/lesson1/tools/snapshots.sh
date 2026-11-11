#!/usr/bin/env bash
# مشغّل صانع اللقطات: يفتح خادمًا محليًا لمجلد الموقع ثم يلتقط كل ضغطة
cd "$(dirname "$0")/../../.." || exit 1
python3 -m http.server 8766 >/dev/null 2>&1 & SRV=$!
sleep 1
python3 lessons/lesson1/tools/snapshots.py; RC=$?
kill $SRV 2>/dev/null
exit $RC
