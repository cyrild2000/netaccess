export default function UserSearchBar({filter, onChange}: {filter:string, onChange:any}){
    return(
        <>
        <h3>Rechercher</h3>
        <form>
            <label htmlFor="inputsearch" className="form-label">Saisissez le nom :&nbsp;</label>
            <input type="text" id="inputsearch" value={filter} onChange={onChange} />
        </form>
        </>
    );
}