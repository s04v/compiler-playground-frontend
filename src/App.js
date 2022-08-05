import './App.scss';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-assembly_x86";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';

const defaultCode = `func main(): void {
    var text: string = "Hello, world!";
    sys_write(text, 12);
}`


const App = () => {
    const [code, setCode] = useState(defaultCode);
    const [building, setBuilding] = useState(false);
    const [terminal, setTerminal] = useState("");

    const build = () => {
        setTerminal("Start building...");
        setBuilding(true);
        setTimeout(() => {
            setBuilding(false);
            setTerminal('Success build');
        }, 500)
    }

    const buildAndRun = () => {

    }
    return (
    <div className="app">
        <div className="buttons">
            <button onClick={build}>Build</button>
            <button onClick={buildAndRun}>Build and Run</button>
        </div>

        <div className="editors">
            <AceEditor
                value={code}
                onChange={(newCode) => setCode(newCode)}
                mode="golang"
                theme="tomorrow"
                width='60vw'
                height="60vh"
                name="primary"
                fontSize={16}
                editorProps={{ $blockScrolling: true }}
            />
            <div>
                { building ?
                    <div className="loader">
                        <CircularProgress />
                    </div>
                    :
                     <></>
                }

                <AceEditor
                    mode="assembly_x86"
                    theme="github"
                    width='40vw'
                    height="60vh"

                    fontSize={16}
                    readOnly={true}

                    name="second"
                    editorProps={{ $blockScrolling: true }}
                />
            </div>

        </div>
        <div className="output">
            {terminal.split('\n').map(str => <p>> {str}</p>)}
        </div>

    </div>
  );
}

export default App;
