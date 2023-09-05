

export function fillReels(symbols:string[]){
    const reels =[]
    for (let i = 0; i < 3; i++) {
        const reel:string[] = [];
        for (let j = 0; j < 3; j++) {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            reel.push(symbols[randomIndex]);
        }
        reels.push(reel);
    }
    return reels
}