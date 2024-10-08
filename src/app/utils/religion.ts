
export interface Religion {
    name: string;
    sects: string[];
}

export const religions: Religion[] = [
    {
        name: 'Christianity',
        sects: ['Catholic', 'Protestant', 'Eastern Orthodox', 'Anglican', 'Oriental Orthodox', 'Restorationism', 'Other Christian']
    },
    {
        name: 'Islam',
        sects: ['Sunni', 'Shia', 'Ibadi', 'Ahmadiyya', 'Sufism', 'Other Islamic']
    },
    {
        name: 'Hinduism',
        sects: ['Vaishnavism', 'Shaivism', 'Shaktism', 'Smartism', 'Reform Hinduism', 'Other Hindu']
    },
    {
        name: 'Buddhism',
        sects: ['Theravada', 'Mahayana', 'Vajrayana', 'Zen', 'Pure Land', 'Other Buddhist']
    },
    {
        name: 'Judaism',
        sects: ['Orthodox', 'Conservative', 'Reform', 'Reconstructionist', 'Karaite', 'Other Jewish']
    },
    {
        name: 'Sikhism',
        sects: ['Nihang', 'Udasi', 'Nirmala', 'Namdhari', 'Other Sikh']
    },
    {
        name: 'Other',
        sects: ['Specify']
    }
];