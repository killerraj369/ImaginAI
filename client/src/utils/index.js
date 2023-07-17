// utils is a file to use its function accrouss our appliation
import FileSaver from 'file-saver';
import {surpriseMePrompts} from '../constants'

export function getRandomPrompt(prompt)
{
    const randomIndex= Math.floor(Math.random()*surpriseMePrompts.length);
    const randomPrompt= surpriseMePrompts[randomIndex];
    if(randomPrompt===prompt) return getRandomPrompt(prompt); // to avoid getting same results in a row
    return randomPrompt
}

export async function downloadImage(_id,photo)
{
    // FileSaver. js is the solution to saving files on the client-side, and is perfect for web apps that generates files on the client,
    // Downloads image
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}
