import { useEffect, useState, useRef, useCallback } from 'react';
import AudioRecorderPolyfill from "audio-recorder-polyfill";
// @ts-ignore
import mpegEncoder from "audio-recorder-polyfill/mpeg-encoder";

// TODO: copy audio visualizer https://codesandbox.io/s/record-audio-and-download-wav-or-mp3-react-audio-analyser-7tkxu?file=/src/AudioRecorder.js
// TODO: copy audio visualizer https://github.com/jiwenjiang/react-audio-analyser

//https://github.com/ai/audio-recorder-polyfill
//https://codesandbox.io/s/audio-recorder-forked-k40d8?file=/src/AudioRecorder.js
//https://codesandbox.io/s/audio-recorder-forked-txrld?file=/src/useRecorder.tsx

AudioRecorderPolyfill.encoder = mpegEncoder
AudioRecorderPolyfill.prototype.mimeType = 'audio/mpeg'
window.MediaRecorder = AudioRecorderPolyfill;

function useRecorder(): [Blob, string, boolean, Function, Function] {
    const [audioURL, setAudioURL] = useState('');

    const obj = {hello: 'world'};
    const bloooob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
    const [audioBlob, setAudioBlob] = useState(bloooob)
    const [isRecording, setRecording] = useState(false);

    const recorder = useRef<MediaRecorder>();

    useEffect(() => {
        // get audio stream from user's mic
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then(function(stream) {
                console.log('ready to record!');
                recorder.current = new MediaRecorder(stream);
                // listen to dataavailable, which gets triggered whenever we have
                // an audio blob available
                recorder.current.addEventListener('dataavailable', (e: any) => {
                    // any is bad, but the typedefs aren't good enough
                    const audioChunks = [];
                    audioChunks.push(e.data);
                    const blob = new Blob(audioChunks, { type: "audio/mp3" });
                    setAudioBlob(blob)

                    setAudioURL(URL.createObjectURL(blob));
                });
            })
            .catch(err => console.error('getUserMedia failed:', err.name));
    }, []);

    const startRecording = useCallback(() => {
        // @ts-ignore
        recorder.current.start();
        setRecording(true);
    }, [recorder.current]);

    const stopRecording = useCallback(() => {
        // @ts-ignore
        recorder.current.stop();
        setRecording(false);
    }, [recorder.current]);

    // @ts-ignore
    return [audioBlob, audioURL, isRecording, startRecording, stopRecording];
}

export default useRecorder;
