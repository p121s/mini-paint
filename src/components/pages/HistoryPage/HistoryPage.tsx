import React, { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getAllImages, getAllUsers, getUserImages } from "../../../store/asyncActions/asuncActions";
import { DivScroll, Image } from "../../../shared/shared.srtled";
import { Images, User } from "../pages.tipes";
import { DivSelect, Select } from "./History.styled";

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

    const getImagesOfTheSelectedUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(getUserImages(e.target.value));
        setIsUser(e.target.value);
    };

    return (
        <>
            <h1>History Page</h1>
            <DivSelect className="block_select">
                <Select onChange={getImagesOfTheSelectedUser}>
                    <option value="">--All images--</option>
                    {allUsers.map((user: User) => (
                        <option key={user.userID} value={user.userID}>
                            {user.userName}
                        </option>
                    ))}
                </Select>
            </DivSelect>
            <DivScroll>
                {isUser
                    ? userImages.map((image: Images) => (
                          <Image
                              key={image.image.substring(image.image.length - 19)}
                              src={image.image}
                              alt=""
                          />
                      ))
                    : allImages.map((image: Images) => (
                          <Image
                              key={image.image.substring(image.image.length - 19)}
                              src={image.image}
                              alt=""
                          />
                      ))}
            </DivScroll>
        </>
    );
}
