export interface Country {
    name: string;
    code: string;
    flag: string;
}

export const countries: Country[] = [
    { name: 'United States', code: '+1', flag: "https://flagcdn.com/w320/us.png" },
    { name: 'United Kingdom', code: '+44', flag: "https://flagcdn.com/w320/gb.png" },
    { name: 'India', code: '+91', flag: "https://flagcdn.com/w320/in.png" },
    { name: 'Pakistan', code: '+92', flag: "https://flagcdn.com/w320/pk.png" },
    { name: 'Saudi Arabia', code: '+966', flag: "https://flagcdn.com/w320/sa.png" }
    // Add more countries
];