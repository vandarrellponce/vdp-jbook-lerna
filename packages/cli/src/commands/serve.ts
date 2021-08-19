import { Command } from 'commander'
import { serve } from 'local-api'
import path from 'path'

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-port, --port <number>', 'port to run the server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename))
      const basename = path.basename(filename)

      await serve(Number(options.port), basename, dir)
    } catch (error) {
      if (error.code === 'EADDRINUSE')
        console.log('Port is already in use, try running on a different port.')
      else console.log(error.message)
    }

    process.exit(1)
  })
