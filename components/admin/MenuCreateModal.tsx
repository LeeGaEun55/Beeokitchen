import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MenuCreateDTO } from '../../dto/menu-create.dto';
import BasicModal from '../BasicModal';
import { GetSingleDownloadUrl } from '../GetDownloadUrl';

const MenuCreateModal = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<MenuCreateDTO>();

    const onSubmit = async (data: MenuCreateDTO) => {
        const url = await GetSingleDownloadUrl(data.tmpUrl);
        data.url = url;
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/menu/create", {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>추가</button>
            <BasicModal onClose={() => setIsModalOpen(false)} isModalOpen={isModalOpen}>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>메뉴 카테고리</label>
                        <select {...register("catagory")}>
                            <option value="Gimbab">김밥</option>
                            <option value="LunchBox">도시락</option>
                            <option value="Salad">샐러드</option>
                            <option value="Beverage">음료</option>
                        </select>
                        <label>메뉴 이름</label>
                        <input placeholder="메뉴 이름을 입력해주세요" {...register("title")} />
                        <label>설명</label>
                        <input placeholder="메뉴에 대해 짧은 설명문을 입력해주세요" {...register("content")} />
                        <label>이미지</label>
                        <input type="file" {...register("tmpUrl", { required: true })} />
                        {errors.tmpUrl && <span>1개 이상의 이미지를 올려주세요!</span>}
                        <button type="submit">제출</button>
                    </form>
                </div>
            </BasicModal>
        </>
    );
};

export default MenuCreateModal;