
const SportSelection =({sports,setSport}) => (
        <>
        <h1 className = 'text-center'> Choose your sports!</h1>
        <div className = 'container-sm d-flex flex-column text-center' style = {{maxWidth:'600px'}}>
            {
                Object.values(sports).map(sport => (
                    <button key = {sport.sport_id} type="button" onClick={ () => setSport(sport.sport_id)} className = 'btn btn-primary m-2 btn-lg' >
                        {sport.name}
                    </button>
                ))
            }
        </div>
        </>
    )

export default SportSelection