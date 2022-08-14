import './App.scss';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-assembly_x86";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import {useState} from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { retrieveFollowingIdentifier } from 'ace-builds/src-noconflict/ext-language_tools';

const defaultCode = `func main(): void {
    var text: string = "Hello, world!";
    sys_write(text, 12);
}`


const App = () => {
    const [code, setCode] = useState(defaultCode);
    const [building, setBuilding] = useState(false);
    const [terminal, setTerminal] = useState("");
    const [asm, setAsm] = useState("");
    const build = () => {
        

        setTerminal("Start building...");
        setBuilding(true);
        setTimeout(() => {
            fetch('http://compiler-playground-backend.norwayeast.cloudapp.azure.com:3000/build',{
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: code
            })
            .then((response) => response.json())
            .then((res) => {
                setBuilding(false);
                setAsm("");
                console.log(res);
                if(res.status === 400){ 
                    setTerminal(res.msg);
                } else {
                    setTerminal(res.output);
                    setAsm(res.asm);
                }
            });       
        }, 500);
        
    }

    return (
    <div className="app">
        <div className="buttons">
            <button onClick={build}>Build</button>
        </div>

        <div className="editors">
            { building ?
                <div className="loader">
                    <CircularProgress />
                </div>
                :
                <></>
            }
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


                <AceEditor
                    value={asm}
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
            {terminal}
        </div>

    </div>
  );
}

export default App;
