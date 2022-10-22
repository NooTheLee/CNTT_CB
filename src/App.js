import Question from "./components/Question";
import txt from "./files/D1.txt";
import txt2 from "./files/D2.txt";
import txt3 from "./files/D3.txt";
import txt4 from "./files/D4.txt";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [d1, setD1] = useState([]);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);

    const [topic, setTopic] = useState("d1");

    const createData = (q, a, b, c, d, n) => {
        return {
            question: q,
            answer: [a, b, c, d],
            trueAnswer: n,
        };
    };

    const handleData = (data) => {
        const spData = data.split("\n");
        const xx = [];
        spData.forEach((element) => {
            if (element !== "\r" && element) {
                xx.push(element);
            }
        });

        const newData = [];
        let temp = [];
        let i = 0;
        xx.forEach((element) => {
            temp.push(element.replace("\r", ""));
            i++;
            if (i === 5) {
                i = 0;
                newData.push(temp);
                temp = [];
            }
        });

        const lastData = newData.map((v) => {
            let a = "";
            v.forEach((i) => {
                if (i[0] === "-") {
                    a = i.replace("-", "");
                }
            });

            var numbers = [1, 2, 3, 4];
            var chosen = [];
            for (var i = 0; i < 4; i++) {
                var index = Math.floor(Math.random() * numbers.length + 1) - 1;
                chosen.push(numbers[index]);
                numbers.splice(index, 1);
            }

            return createData(
                v[0],
                v[chosen[0]].replace("-", ""),
                v[chosen[1]].replace("-", ""),
                v[chosen[2]].replace("-", ""),
                v[chosen[3]].replace("-", ""),
                a
            );
        });

        const leng = lastData.length;

        let xData = Array.from(Array(leng).keys());

        const positionXData = (() => {
            const chosen = [];
            for (var j = 0; j < leng; j++) {
                var index = Math.floor(Math.random() * xData.length + 1) - 1;
                chosen.push(xData[index]);
                xData.splice(index, 1);
            }
            return chosen;
        })();

        let xxxx = [];
        for (var j = 0; j < leng; j++) {
            xxxx.push(lastData[positionXData[j]]);
        }

        setD1(xxxx);
    };

    const readDataD1 = async () => {
        try {
            const {data} = await axios.get(txt);
            handleData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readDataD2 = async () => {
        try {
            const {data} = await axios.get(txt2);
            handleData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readDataD3 = async () => {
        try {
            const {data} = await axios.get(txt3);
            handleData(data);
        } catch (error) {
            console.log(error);
        }
    };

    const readDataD4 = async () => {
        try {
            const {data} = await axios.get(txt4);
            handleData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setCorrect(0);
        setIncorrect(0);
        setD1([]);
        if (topic === "d1") {
            readDataD1();
            return;
        }
        if (topic === "d2") {
            readDataD2();
            return;
        }
        if (topic === "d3") {
            readDataD3();
            return;
        }
        if (topic === "d4") {
            readDataD4();
            return;
        }
    }, [topic]);

    const handleScore = (x) => {
        if (x) {
            setCorrect((i) => i + 1);
            return;
        }
        setIncorrect((i) => i + 1);
    };

    const handleSelect = (e) => {
        setTopic(e.target.value);
    };

    const topicName = () => {
        switch (topic) {
            case "d1":
                return "Đề 1";
            case "d2":
                return "Đề 2";
            case "d3":
                return "Đề 3";
            case "d4":
                return "Đề 4";
            default:
                return "";
        }
    };

    return (
        <div className='h-screen w-screen px-[5%] lg:px-[25%] overflow-x-hidden dark:bg-[#18191A] dark:text-[#E4E6EB] pb-10 '>
            <div className='fixed top-[10vh] right-[5vw] flex gap-x-4'>
                <div className=' border-[5px] border-green-600 w-[100px] h-[100px] flex items-center justify-center text-[50px] rounded-2xl text-green-700 font-[600] '>
                    {correct}
                </div>
                <div className=' border-[5px] border-red-600 w-[100px] h-[100px] flex items-center justify-center text-[50px] rounded-2xl text-red-700 font-[600] '>
                    {incorrect}
                </div>
            </div>

            <div
                id='select'
                className='w-full text-center text-red-600 text-[100px] font-extrabold my-10 '>
                {topicName()}
            </div>
            <select
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-5 text-bold '
                onChange={handleSelect}
                value={topic}>
                <option value='d1'>Đề 1</option>
                <option value='d2'>Đề 2</option>
                <option value='d3'>Đề 3</option>
                <option value='d4'>Đề 4</option>
            </select>
            <div className='w-full '>
                {d1.map((v, id) => (
                    <Question
                        data={v}
                        id={id}
                        handleCheck={handleScore}
                        key={id + "keyQ"}
                    />
                ))}
            </div>

            <a
                className='w-full px-5 py-2 my-10 text-xl font-bold text-center text-white bg-green-500 cursor-pointer rounded-2xl '
                href='#select'>
                Làm bài thi khác
            </a>
        </div>
    );
}

export default App;
