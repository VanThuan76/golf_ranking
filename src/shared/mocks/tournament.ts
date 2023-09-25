import useTrans from "../hooks/useTrans"

export const TournamentGroupData = () => {
    const { trans } = useTrans()
    return [
        {
            id: 1,
            name: trans.tournament.VGAJuniorSolutionSystem,
            image: '/static/images/VGAJuniorSolutionSystem.jpg',
        },
        {
            id: 3,
            name: trans.tournament.VietnamJuniorOpenVJO,
            image: '/static/images/VietnamJuniorOpen(VJO).jpg',
        },
        {
            id: 4,
            name: trans.tournament.VietnamAmateurOpenVAO,
            image: '/static/images/VietnamAmateurOpen(VAO).jpg',
        },
        {
            id: 5,
            name: trans.tournament.VGATourSolutionSystem,
            image: '/static/images/VGATourTournamentSystem.jpg',
        },
        {
            id: 6,
            name: trans.tournament.LocalTournaments,
            image: '/static/images/Delocation.jpg',
        },
        {
            id: 7,
            name: trans.tournament.SoutheastAsiaRegionalTournaments,
            image: '/static/images/SoutheastAsiaRegionalTournaments.jpg',
        },
        {
            id: 8,
            name: trans.tournament.AsianRegionalTournaments,
            image: '/static/images/AsianRegionalTournaments.jpg',
        },
        {
            id: 9,
            name: trans.tournament.DifferentTournamentsSystem,
            image: '/static/images/DifferentPrizeSystem.jpg',
        },
    ];
}
export const imageGroupDetail = "/static/images/MemberDetails.png"