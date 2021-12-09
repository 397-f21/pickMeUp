const SportHeader = ({data, sport}) => (
    <h4 className='text-center'
        data-testid='sport-name'
        data-cy='sport-header'>
        {data.sports[sport].name} Events
    </h4>
);

export default SportHeader