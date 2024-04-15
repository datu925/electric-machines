import configureMeasurements from 'convert-units';
import allMeasures, {AllMeasuresUnits} from 'convert-units/definitions/all';

const convert = configureMeasurements(allMeasures);

export function convertUnit(val: number, fromUnit: string, toUnit: string): number {
    if (val == Number.MAX_VALUE || fromUnit == toUnit) {
        return val;
    }
    return convert(val).from(fromUnit as AllMeasuresUnits).to(toUnit as AllMeasuresUnits);
}
