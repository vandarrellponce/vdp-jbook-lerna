import { Command } from 'commander'
import { serve } from 'local-api'
import path from 'path'

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-port, --port <number>', 'port to run the server on', '4005')
  .action((filename = 'notebook.js', options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename))
    const basename = path.basename(filename)

    serve(Number(options.port), basename, dir)
  })
