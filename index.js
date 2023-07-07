const server = require('./src/app')
const { conn } = require('./src/db')
const { addInformation } = require('./src/temp')
const { PORT } = require('./src/config/index')

const FORCE = false
const RunsOn = PORT || 3001
conn.sync({ alter: !FORCE, force: FORCE }).then(async () => {
  server.listen(RunsOn, async () => {
    if (FORCE) await addInformation()
    console.log(`%s listening at port → ${RunsOn}`)
  })
})
