// 🎓 NEXT LECTURE — CLEAN RECTANGLE
// Batch: 15-B

const timetable = {

  1: [ // Monday
    ["08:45","09:40","sub","sir name","room no"],
    ["09:40","10:35","sub","sir name","room no"],
    ["10:50","11:45","sub","sir nam","room no"],
    ["11:45","12:45","sub","sir nam","room no"],
    ["12:45","13:40","sub","sir nam","room no"],
    ["13:40","14:35","sub","sir nam","room no"],
    ["14:35","15:30","sub","sir nam","room no"]
  ],

  2: [ // Tuesday
    ["08:45","09:40","sub","sir name","room no"],
    ["09:40","10:35","sub","sir name","room no"],
    ["10:50","11:45","sub","sir nam","room no"],
    ["11:45","12:45","sub","sir nam","room no"],
    ["12:45","13:40","sub","sir nam","room no"],
    ["13:40","14:35","sub","sir nam","room no"],
    ["14:35","15:30","sub","sir nam","room no"]
  ],

  3: [ // Wednesday 
    ["08:45","09:40","sub","sir name","room no"],
    ["09:40","10:35","sub","sir name","room no"],
    ["10:50","11:45","sub","sir nam","room no"],
    ["11:45","12:45","sub","sir nam","room no"],
    ["12:45","13:40","sub","sir nam","room no"],
    ["13:40","14:35","sub","sir nam","room no"],
    ["14:35","15:30","sub","sir nam","room no"]
  ],

  4: [ // Thursday
    ["08:45","09:40","sub","sir name","room no"],
    ["09:40","10:35","sub","sir name","room no"],
    ["10:50","11:45","sub","sir nam","room no"],
    ["11:45","12:45","sub","sir nam","room no"],
    ["12:45","13:40","sub","sir nam","room no"],
    ["13:40","14:35","sub","sir nam","room no"],
    ["14:35","15:30","sub","sir nam","room no"]
  ],

  5: [ // Friday
    ["08:45","09:40","sub","sir name","room no"],
    ["09:40","10:35","sub","sir name","room no"],
    ["10:50","11:45","sub","sir nam","room no"],
    ["11:45","12:45","sub","sir nam","room no"],
    ["12:45","13:40","sub","sir nam","room no"],
    ["13:40","14:35","sub","sir nam","room no"],
    ["14:35","15:30","sub","sir nam","room no"]
  ]
}


// ===============================
// TIME FUNCTIONS
// ===============================

const now = new Date()
const day = now.getDay()

function makeTime(time) {

  const [h, m] = time.split(":").map(Number)

  const d = new Date(now)

  d.setHours(h)
  d.setMinutes(m)
  d.setSeconds(0)
  d.setMilliseconds(0)

  return d
}


// ===============================
// FIND NEXT LECTURE
// ===============================

let lecture = null

const today = timetable[day] || []

for (const item of today) {

  const start = makeTime(item[0])
  const end = makeTime(item[1])

  if (now < end) {

    lecture = {
      data: item,
      start: start,
      end: end
    }

    break
  }
}


// ===============================
// FUTURE DAY
// ===============================

if (!lecture) {

  for (let i = 1; i <= 7; i++) {

    const futureDay = (day + i) % 7

    if (
      timetable[futureDay] &&
      timetable[futureDay].length > 0
    ) {

      const item = timetable[futureDay][0]

      const futureDate = new Date(now)

      futureDate.setDate(
        futureDate.getDate() + i
      )

      const [h, m] =
        item[0].split(":").map(Number)

      futureDate.setHours(h)
      futureDate.setMinutes(m)
      futureDate.setSeconds(0)
      futureDate.setMilliseconds(0)

      lecture = {
        data: item,
        start: futureDate,
        end: futureDate
      }

      break
    }
  }
}


// ===============================
// WIDGET
// ===============================

const widget = new ListWidget()

widget.backgroundColor =
  new Color("#111113")

widget.setPadding(
  14,
  16,
  14,
  16
)


// ===============================
// CONTENT
// ===============================

if (lecture) {

  const [
    startTime,
    endTime,
    subject,
    teacher,
    room
  ] = lecture.data


  // Small header

  const header =
    widget.addText("NEXT LECTURE")

  header.font =
    Font.mediumSystemFont(9)

  header.textColor =
    new Color("#8E8E93")


  widget.addSpacer(5)


  // Subject

  const title =
    widget.addText(subject)

  title.font =
    Font.boldSystemFont(22)

  title.textColor =
    Color.white()


  widget.addSpacer(4)


  // Time + Room

  const info =
    widget.addText(
      `${startTime} — ${endTime}    •    ${room}`
    )

  info.font =
    Font.mediumSystemFont(12)

  info.textColor =
    new Color("#C7C7CC")


  widget.addSpacer()


    }


else {

  const title =
    widget.addText("NO LECTURES")

  title.font =
    Font.boldSystemFont(18)

  title.textColor =
    Color.white()
}


// ===============================
// REFRESH
// ===============================

widget.refreshAfterDate =
  new Date(
    now.getTime() + 15 * 60 * 1000
  )


// ===============================
// SHOW
// ===============================

if (config.runsInWidget) {

  Script.setWidget(widget)

} else {

  await widget.presentMedium()

}

Script.complete()