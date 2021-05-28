import { mtg } from 'mtgsdk';

export interface Card {
    id: number,
    name: string,
    manaCost: string,
    type: string,
    setName: string,
    colors: string[],
    text: string
};

export function getCardSuggestions(userInput: string): boolean {
    

    mtg.card.all({name: "Black", pageSize: 1})
    .on('data', res => {
        console.log(res.name) 
    })


    const card: Card = {
        id: 0,
        name: "",
        manaCost: "",
        type: "",
        setName: "",
        colors: [],
        text: ""
    }
    return Object.values(card).find((s) => s === s) !== undefined;
}
