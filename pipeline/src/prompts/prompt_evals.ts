export const SYSTEM: string = `You are a helpful assistant that creates diff reports of JSON objects.

You will be given an expert response and a student response in the form of two JSON objects. You will grade the match and return your output in the form of another JSON object with a key for each key in the original objects. The value will be a JSON object containing a grade and your explanation for it.

For each key, first write out in a step by step manner your reasoning to be sure that your conclusion is correct. Avoid simply stating the correct answer at the outset. That will be a key with name "explanation".
Then add a key named "grade" with a single choice from the following (without quotes or punctuation).

For each key:
If they are very similar, the grade is "A". They should contain roughly the same words in each value, possibly shuffled around or using synonyms.
If they are semantically similar, containing mostly the details, the grade is "B". They should contain largely the same concepts but can vary more than for grade A.
If they have some overlap in details, but also differ significantly, the grade is "C".
If they seem to have almost no overlap, the grade is "D".

An example value might be be {"explanation": "The student answer doesn't mention light bulbs, whereas the expert answer does, but they both mention a per-consumer limit", "grade": "C"}.

Be sure to return valid JSON. You can mention either the student or expert answers, but don't quote them directly to avoid producing malformed JSON.
`;

export const EXAMPLE_1_USER: string = `
Expert:
{
    "Technology*": "Heat Pump Water Heater (HPWH)",
    "Program Description (guideline)": "Rebate up to $200 on an Energy Star certified heat pump water heater",
    "Program Status": "Active",
    "Rebate Type": "Rebate (post purchase)",
    "Rebate Value*": "$200",
    "Amount Type*": "dollars",
    "Equipment Standards Restrictions": "• Uniform energy factor of 2.20 for 120V/15A.\n• Must be ENERGY STAR certified.",
    "Contractor Restrictions": "Work must be performed by a Colorado Contractor. Do-it-yourself work does not qualify.",
    "Other Restrictions": "Homes must be heated by electric rather than gas to qualify."
}

Student:
{
    "Technology*": "Heat Pump Water Heater",
    "Program Description (guideline)": "Up to $200 on an Energy Star heat pump water heater",
    "Program Status": "Paused",
    "Rebate Type": "Point of sale rebate",
    "Rebate Value*": "200",
    "Amount Type*": "dollar amount",
    "Equipment Standards Restrictions": "Must be ENERGY STAR-certified. UEF of 2.20 for 120V/15A.",
    "Contractor Restrictions": "Limit 1 per customer per account type. Global amount of $5,000 across all rebates. DIY work is not permitted.",
    "Other Restrictions": "You will need to file a rebate with 90 days of appliance purchase."
}`;

export const EXAMPLE_1_RESPONSE = `{
    "Technology": {"explanation": "The Technology field contains the same concepts with almost the same words.", "grade": "A"},
    "Program Description (guideline)": {"explanation": "The Program Description (guideline) field have the same dollar value, both mention Energy Star, and are for heat pump water heaters", "grade": "A"},
    "Program Status": {"explanation": "Program Status has different concepts for student and expert answer", "grade": "D"},
    "Rebate Type": {"explanation": "Post purchase and point of sale are different kinds of rebates", "grade": "D"},
    "Rebate Value*": {"explanation": "Student answer is missing a dollar sign, but the value is the same", "grade": "A"},
    "Amount Type*": {"explanation": "The Amount Type has the same concept with slightly different wording", "grade": "A"},
    "Equipment Standards Restrictions": {"explanation": "Both answers mention Energy Star certification and have the same technical details", "grade": "B"},
    "Contractor Restrictions": {"explanation": "The expert answer mentions contractor restrictions. The student answer mentions a global amount and per customer limit. Both answers contain some details on DIY work.", "grade": "C"},
    "Other Restrictions": {"explanation": "The given answers have no significant overlap.", "grade": "D"}
}
`;
