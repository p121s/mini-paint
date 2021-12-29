import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getAllImages, getAllUsers, getUserImages } from "../../store/asyncActions/asuncActions";
import { DivScroll } from "../../styledComponents/blocks/DivScroll";

export default function HistoryPage(): JSX.Element {
    const dispatch = useDispatch();
    const allImages = useSelector((state: RootStateOrAny) => state.reduceImages.allImages);
    const allUsers = useSelector((state: RootStateOrAny) => state.reduceUsers.allUsers);
    const userImages = useSelector((state: RootStateOrAny) => state.reduceImages.userImages);
    const [isUser, setIsUser] = useState<string>();

    useEffect(() => {
        dispatch(getAllImages());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const getImagesOfTheSelectedUser = ({ target: { value } }: any) => {
        dispatch(getUserImages(value));
        setIsUser(value);
    };

    return (
        <>
            <h1>History Page</h1>
            <div className="block_select">
                <select onChange={getImagesOfTheSelectedUser}>
                    <option value="">--All images--</option>
                    {allUsers.map((user: any) => (
                        <option key={user.userID} value={user.userID}>
                            {user.userName}
                        </option>
                    ))}
                </select>
            </div>
            <DivScroll>
                {isUser
                    ? userImages.map((image: any) => (
                          <img
                              className="image"
                              key={image.image.substr(image.image.length - 19)}
                              src={image.image}
                              alt=""
                          />
                      ))
                    : allImages.map((image: any) => (
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
