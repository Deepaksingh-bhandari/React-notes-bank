import React,{ useState ,useEffect,useContext} from "react";
import NoteContext from "./NoteContext";
import UserContext from "./UserContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
  const {userDetails} = useContext(UserContext);

    useEffect(() => {
        if(userDetails.loggedIn)
        fetchNote();
      }, [userDetails]);

    let initialNotes = [];
    // Initial notes to be fetched from the API
    const [notes, setnotes] = useState(initialNotes);

    // 1 Operation - ADD NOTE
    const addNote = async (title, description, tag) => {
        const authToken=sessionStorage.getItem('authToken')
        console.log("Add Note Called :", title, description, tag)
        let url = `${host}/api/notes/addNote`

        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'authToken':authToken 
                // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMWVlYzlhZjIxMmZhMzg4Y2FiZjQ1In0sImlhdCI6MTY0MzI0NTI5Mn0.T-TZH-pgoYiGdAsvm-dr8A1FhjFtnId86-nfEgU-nNU"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        let resp = await response.json(); // parses JSON response into native JavaScript objects

        if (resp.status === "success") {//   success ALERT TO SHOW 
            console.log("Note added succesfully")
        }
        else {
            //  SOME ERROR ALERT
            console.log("Failed to add note")
        }
        // Calling fetch notes to fetch updated notes
        fetchNote();
    }
    // 2nd Operation - EDIT NOTE
    const editNote = async (id, data) => {
        const authToken=sessionStorage.getItem('authToken')

        console.log("edit Note Called");
        let url = `${host}/api/notes/updatenote/${id}`

        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'authToken': authToken 
                // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMWVlYzlhZjIxMmZhMzg4Y2FiZjQ1In0sImlhdCI6MTY0MzI0NTI5Mn0.T-TZH-pgoYiGdAsvm-dr8A1FhjFtnId86-nfEgU-nNU'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        let resp = await response.json(); // parses JSON response into native JavaScript objects

        if (resp.status === "success") {//   success ALERT TO SHOW 
            fetchNote()
            console.log("Note edited succesfully")
        }
        else {
            console.log("Note edit failed",resp.status)
            //  SOME ERROR ALERT
        }
    }

    // 3rd Operation - DELETE NOTE
    const deleteNote = async (id) => {
        const authToken=sessionStorage.getItem('authToken')

        console.log("Delete note triggered: ", id)

        let url = `${host}/api/notes/deletenote/${id}`

        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'authTOken': authToken
                // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMWVlYzlhZjIxMmZhMzg4Y2FiZjQ1In0sImlhdCI6MTY0MzI0NTI5Mn0.T-TZH-pgoYiGdAsvm-dr8A1FhjFtnId86-nfEgU-nNU'
                // token
            },
        });
        let resp = await response.json(); // parses JSON response into native JavaScript objects

        if (resp.status === "success") {//   success ALERT TO SHOW 
            console.log("Note deleted succesfully")
            fetchNote()

        }
        else {
            console.log("Note deletion failed")
            alert("Note deletion failed")
            //  SOME ERROR ALERT
        }
        // Calling fetch notes to fetch updated notes
        fetchNote();
    }

    //4th Operation - FETCH ALL NOTES
    const fetchNote = async () => {
        const authToken=sessionStorage.getItem('authToken')
        let url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'authToken':authToken
                // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMWVlYzlhZjIxMmZhMzg4Y2FiZjQ1In0sImlhdCI6MTY0MzI0NTI5Mn0.T-TZH-pgoYiGdAsvm-dr8A1FhjFtnId86-nfEgU-nNU' 
                // token

            }// body data type must match "Content-Type" header
        });

        let resp = await response.json();

        if (resp.status === "success") {//   success ALERT TO SHOW 
            console.log("fetched Notes succesfully",resp.data);
            setnotes(resp.data)
        }
        else {//  SOME ERROR ALERT}
        }
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote ,fetchNote}}>
            {props.children}
        </NoteContext.Provider>
    );
}
export default NoteState;