import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { useRef, useState } from 'react'
import './code-editor.css'

const CodeEditor: React.FC<{
  initialValue: string
  handleChange: (value: string) => void
  submitCode: (value: string) => void
}> = ({ initialValue, handleChange, submitCode }) => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>()
  const [value, setValue] = useState('')

  // handling value changes in the monacoEditor
  const editorDidMount: EditorDidMount = (getValue, editor) => {
    // getting reference to the editor
    editorRef.current = editor

    // when value of editor changes
    editor.onDidChangeModelContent(() => {
      /*  handleChange(getValue()) */
      setValue(getValue())
    })

    editor.getModel()?.updateOptions({ tabSize: 2 })
  }

  const handleFormat = () => {
    // get current value from the editor
    const unformatted = editorRef.current?.getModel()?.getValue()

    let formatted = ''

    //format the value
    if (unformatted) {
      formatted = prettier
        .format(unformatted, {
          parser: 'babel',
          plugins: [parser],
          useTabs: false,
          semi: true,
          singleQuote: true,
        })
        .replace(/\n$/, '')
    }

    // set the formatted value back in the editor
    editorRef.current?.setValue(formatted)
  }

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={handleFormat}
      >
        Format
      </button>
      <button
        className="button button-submit is-secondary is-small"
        onClick={() => submitCode(value)}
      >
        Submit
      </button>

      {/*  <button className="button button-submit is-small" onClick={handleFormat}>
        Submit
      </button> */}
      <MonacoEditor
        value={initialValue} // this is an initial value, do not complicate it with 'value' attribute
        editorDidMount={editorDidMount}
        height="100%"
        theme="dark"
        language="javascript"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  )
}

export default CodeEditor
