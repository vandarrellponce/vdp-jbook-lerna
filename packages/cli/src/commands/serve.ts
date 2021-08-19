import { Command } from 'commander'

export const serveCommand = new Command()
  .command('serve [filename]') // [] brackets means that this is an optional value for commander
  .description('Open a file for editing')
  .option('-port, --port <number>', 'port to run the server on', '4005') // <> brackets means that is a required value for commander
  .action((filename = 'notebook.js', options) => {
    // first arg is the optional value, next is an object with required value
    console.log(filename, options)
  })
