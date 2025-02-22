
interface AudioPlayer{
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details{
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 120,
    song: "La marchita",
    details: {
        author: "Hugo",
        year:2025
    }
}

console.log('Song: ', audioPlayer.song);
console.log('Duration: ', audioPlayer.songDuration);
console.log('autor: ', audioPlayer.details.author);

//Objetos
//seria un desestructuracion concatenada
const {song: anotherSong, songDuration: duration, details} = audioPlayer;
const {author: autor} = details;

console.log('Song: ', anotherSong);
console.log('Duration: ', duration);
console.log('autor: ', autor);

const dbz: string[]=['Goku', 'Otro', 'Tercera Posicion'];

console.log("Personaje tres ", dbz[2]);

const [, , tercer] = ['Goku', 'Otro', 'Tercera Posicion'];
console.log('peronaje 3 ', tercer);




export{}