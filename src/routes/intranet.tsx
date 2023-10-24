import { Show } from "solid-js";
import { createServerAction$, redirect } from "solid-start/server";
import axios from "axios";

export default function Intranet() {
    const [loading, { Form }] = createServerAction$(async (form: FormData) => {
        const id = form.get("intranetId") as string;
        const pw = form.get("intranetPw") as string;
        console.log(id, pw);
        if (!id || !pw) {
            throw "인트라넷 계정 정보를 입력해주세요.";
        }

        try {
            const user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36';
            const headers = {
                'User-Agent': user_agent,
                'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
            };
            const session = axios.create({
                headers: headers
            });

            const url_login_page = 'https://hi.hana.hs.kr/member/login.asp';
            await session.get(url_login_page);

            const url_login_proc = 'https://hi.hana.hs.kr/proc/login_proc.asp';
            const login_data = {
                'login_id': id,
                'login_pw': pw,
                'x': String(Math.floor(Math.random() * 90) + 10),
                'y': String(Math.floor(Math.random() * 90) + 10)
            };
            session.post(url_login_proc, {
                headers: { 'Referer': url_login_page },
                data: login_data
            });

            const url_mypage = 'https://hi.hana.hs.kr/SYSTEM_Member/Member/MyPage/mypage.asp';
            const response = await session.get(url_mypage, {
                headers: { 'Referer': 'https://hi.hana.hs.kr/' }
            })
            const start_index = response.data.indexOf("조회용 개인번호 : ") + "조회용 개인번호 : ".length;
            const personal_code = response.data.substring(start_index, start_index + 6);
            if(personal_code=="E html") {
                throw "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
            }
            return redirect("/inquiry?code=" + personal_code);
        } catch (e) {
            console.log(e);
            throw "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
        }
    });

    return (
        <main class="bg-gray-100">
            <div class="min-h-screen flex items-center justify-center">
                <div class="bg-white rounded-lg p-10 shadow-md">
                    <h1 class="text-3xl font-bold mb-6">고사장 통합 조회 시스템</h1>
                    <Form>
                        <label class="block mb-2">인트라넷 아이디</label>
                        <input name="intranetId" class="block w-full mb-4 p-2 border border-gray-300 rounded" type="text" disabled={loading.pending} />
                        <label class="block mb-2">인트라넷 비밀번호</label>
                        <input name="intranetPw" class="block w-full mb-4 p-2 border border-gray-300 rounded" type="password" disabled={loading.pending} />
                        <button id="submitButton"
                            class="w-full py-3 px-6 text-center font-semibold text-white rounded-lg bg-blue-500" type="submit"
                            disabled={loading.pending}>
                            <Show when={loading.pending} fallback="조회하기">
                                로그인 중...
                            </Show>
                        </button>
                        <Show when={loading.error}>
                            <p class="text-red-500 mt-4 text-sm">{loading.error}</p>
                        </Show>
                        <p class="text-xs text-gray-600 mt-4">인트라넷 계정 정보는 서버에 저장되지 않으며, 고사장 조회의 목적으로만 이용됩니다.</p>
                    </Form>
                </div>
            </div>
        </main>
    )
}