// TODO: put an universal unit converter for all units?
export function LbToKg(lb: number) {
    return lb * 0.45359237;
}

// TODO: convert noise [low/medium/high] to numerical value that can be searched and lookup.
export function NoiseLevelToDecibel(noiseLevel: string) {
    return 100;
}

// TODO: convert noise numerical value =>  noise [low/medium/high]
export function DecibelToNoiseLevel(decibel: number) {
    return "Low";
}

// TODO: finalised size => typical capacity
export function HouseholdSizeToCapacity(size: string) {
    switch(size) {
        case "1-2": return 60;
        case "3-4": return 70;
        case "5-6": return 80;
        case "7+": return 90;
        default: return 100;
    }
}
