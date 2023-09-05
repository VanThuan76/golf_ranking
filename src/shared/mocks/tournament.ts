export const tournamentData = [
    {
        id: 0,
        name: "Hệ thống giải VGA Junior",
    },
    {
        id: 1,
        name: "Hệ thống giải VGA Junior",
    },
    {
        id: 2,
        name: "Hệ thống giải VGA Junior",
    },
    {
        id: 3,
        name: "Hệ thống giải VGA Junior",
    },
    {
        id: 4,
        name: "Hệ thống giải VGA Junior",
    },
    {
        id: 5,
        name: "Hệ thống giải VGA Junior",
    },
    {
        id: 6,
        name: "Hệ thống giải VGA Junior",
    },
    {
        id: 7,
        name: "Hệ thống giải VGA Junior",
    }
]

export const dataGroupTournament = [
    {
        id: 1,
        title: "VGA JUNIOR 2023",
        type_tournament: "Hệ thống giải VGA Junior",
        type_golf: "Đấu gậy",
        round: 3,
        organization: "Hiệp hội Golf Việt NAM",
        age: [18, 15, 12, 9],
        area: "Châu Á",
        country: "VN",
        location: "Hà Nội",
        fromDate: '07/06/2023',
        toDate: '24/11/2023',
        status: "Hoàn thành",
        champion_athlete: {
            id: 1,
            rank: 1,
            name: "Nguyễn Đặng Minh",
            gender: "Nam",
            round_point: [74, 75, 70],
            to_par: 3,
            point: 219,
            achievement: 23,
        }
    }
]


export const dataDetailTournament = {
    tournament: {
        id:1,
        title: "VGA JUNIOR 2023",
        location: "Hà Nội",
        area: "Châu Á",
        country: "VN",
        age: [18, 15, 12, 9],
        fromDate: '07/06/2023',
        toDate: '24/11/2023',
        type_tournament: "Hệ thống giải VGA Junior",
        organization: "Hiệp hội Golf Việt NAM",
        round: 3,
        type_golf: "Đấu gậy",
        status: "Hoàn thành",
    },
    results: {
        U18: [
            {
                rank: 1,
                member: "Nguyễn Đặng Minh",
                round: [74, 75, 70],
                to_par: 3,
                point: 219,
                achievement: 23,
                gender: 1,
            },
            {
                rank: 2,
                member: "Nguyễn Đặng Minh",
                round: [74, 75, 70],
                to_par: 3,
                point: 219,
                achievement: 23,
                gender: 0,
            }
        ],
        U9: [
            {
                rank: 1,
                member: "Nguyễn Đặng Minh",
                round: [74, 75, 70],
                to_par: 3,
                point: 219,
                achievement: 23,
                gender: 0,
            },
            {
                rank: 2,
                member: "Nguyễn Đặng Minh",
                round: [74, 75, 70],
                to_par: 3,
                point: 219,
                achievement: 23,
                gender: 0,
            }
        ]
    }
}

