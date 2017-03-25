import cp from 'child_process'
import run from './run'
import fs from './lib/fs'
import check from './check'

const FORCE = process.argv.includes('force')
const PROD = process.argv.includes('production')

async function deploy() {
  const valid = await check('demo-model')
  if (!valid) {
    console.log('Deploy terminated.')
    return Promise.reject()
  }
  process.argv.push('release')
  await run(require('./build'))

  const name = 'demo-service'

  const excludes = [
    '',
    '/node_modules/*',
    'log',
    'pid',
    '.git/',
    '.DS_Store',
  ]

  if (!FORCE) {
    excludes.push('config.json')
    excludes.push('demo-service.json')
  }

  const target = PROD ? 'demo-deploy' : 'demo'

  const cmd = [
    'rsync -avz --delete',
    '--include="/node_modules/demo-model"',
    (excludes.join('" --exclude="') + '"').slice(2),
    '-e "ssh -o StrictHostKeyChecking=no"',
    './build/',
    `${target}:~/${name}`,
  ].join(' ')

  return new Promise((resolve, reject) => {
    function start() {
      const server = cp.spawn(
        '/bin/sh',
        ['-c', cmd]
      )
      server.stdout.on('data', data => {
        let time = new Date().toTimeString()
        time = time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
        process.stdout.write(`[${time}] `)
        process.stdout.write(data)
        if (data.toString('utf8').includes('total size is')) {
          resolve()
        }
      })
      server.stderr.on('data', data => process.stderr.write(data))
      server.on('error', err => reject(err))
    }

    start()
  })
}

export default deploy
