import "./Sidebar.css";
import {useSidebarContext} from "../../contexts/SidebarContext.tsx";


export function Sidebar(): JSX.Element {
    const {data} = useSidebarContext();

    return (
        <div className="sidebar">
            <img
                src={`${import.meta.env.BASE_URL}assets/FWB.png`}
                alt="fwb"
                style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    marginTop: '10px'
                }}
            />

            {data.buttons || data.data ? (
                    <>
                        <br/>
                        <div> {data.buttons} </div>
                        <hr/>
                        <br/>
                        <div> {data.data} </div>
                    </>
                ) :
                (<>
                    <img src={import.meta.env.BASE_URL + '/assets/coins.gif'} alt="coins"/>
                    <img src={import.meta.env.BASE_URL + '/assets/coins.gif'} alt="coins"/>
                </>)
            }
        </div>
    )
        ;
}

export default Sidebar;
