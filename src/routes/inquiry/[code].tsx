import { Show, For } from "solid-js";
import { useParams, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { db } from "~/db";

export function routeData() {
    const data = createServerData$(async () => {
        const personal_code = useParams().code;
        const data = await db.examroom.findMany({
            where: {
                code: personal_code,
            },
        });
        data.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            if (a.period < b.period) {
                return -1;
            }
            if (a.period > b.period) {
                return 1;
            }
            return 0;
        });
        const final_data = {
            data: data,
            message: "조회된 고사장 정보입니다.",
        };
        return final_data;
    });
    return data;
}

export default function Inquiry() {
    const data = useRouteData();
    const personal_code = useParams().code;
    return (
        <main class="bg-gray-100 min-h-screen">
            <div class="container mx-auto py-12">
                <div class="bg-white p-8 rounded-xl shadow-md">
                    <h1 class="text-3xl font-bold mb-8">고사장 통합 조회 시스템</h1>
                    <div id="data-container" class="space-y-4">
                        <Show when={data()}>
                            <Show when={data().message} fallback={
                                <p class="text-red-500 text-sm">알 수 없는 오류가 발생했습니다.</p>
                            }>
                            <p>학생 코드: {personal_code}</p>
                            <Show when={data().data.length > 0} fallback={
                                <p class="text-red-500">조회된 고사장 정보가 없습니다.</p>
                            }>
                                <p>{data().message}</p>
                                <table class="border table-auto text-center border-gray-700">
                                    <thead class="border border-gray-700">
                                        <tr>
                                            <th class="px-8">과목</th>
                                            <th class="px-8">고사장</th>
                                            <th class="px-8">시험일</th>
                                            <th class="px-8">시험 시간</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <For each={data().data}>
                                            {(item) => (
                                                <tr>
                                                    <td class="px-8">{item.subject}</td>
                                                    <td class="px-8">{item.room}</td>
                                                    <td class="px-8">{item.date}</td>
                                                    <td class="px-8">{item.period}교시</td>
                                                </tr>
                                            )}
                                        </For>
                                    </tbody>
                                </table>
                                </Show>
                            </Show>
                        </Show>
                    </div>
                </div>
            </div>
            <footer class="w-full py-4 text-center text-xs text-gray-600">
                Disclaimer : 본 서비스는 참고용으로만 이용해주시길 바라며, 잘못된 정보에 대하여 책임지지 않습니다.
            </footer>
        </main>
    )
}