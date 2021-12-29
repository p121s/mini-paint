import { useEffect } from "react";
import { DivScroll } from "../../styledComponents/blocks/DivScroll";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { getUserImages } from "../../store/asyncActions/asuncActions";

export default function Account(): JSX.Element {
    const dispatch = useDispatch();
    const name = useSelector((state: RootStateOrAny) => state.reduce.name);
    const userImages = useSelector((state: RootStateOrAny) => state.reduceImages.userImages);

    useEffect(() => {
        dispatch(getUserImages());
    }, [dispatch]);

    return (
        <>
            <h1>My Account</h1>
            <h3>{name} Online</h3>
            <DivScroll>
                {userImages.map((image: any) => (
                    <img
                        className="image"
                        key={image.image.substr(image.image.length - 19)}
                        src={image.image}
                        alt=""
                    />
                ))}
            </DivScroll>
        </>
    );
}
