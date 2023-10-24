import { Show } from "solid-js";
import { createRouteAction, redirect } from "solid-start";
import { Form } from "solid-start/data/Form";

export default function PersonalCode() {
    const [loading, { Form }] = createRouteAction(async (form: FormData) => {
        if (!form.get("personalCode")) {
            throw "개인번호를 입력해주세요.";
        }
        return redirect("/inquiry/" + form.get("personalCode")); 
    });
    return (
        <main class="bg-gray-100">
            <div class="min-h-screen flex items-center justify-center">
                <div class="bg-white rounded-lg p-10 shadow-md">
                    <h1 class="text-3xl font-bold mb-6">EVIS: 고사장 조회 시스템</h1>
                    <Form>
                        <label class="block mb-2">조회용 개인번호</label>
                        <input name="personalCode" class="block w-full mb-4 p-2 border border-gray-300 rounded" type="text" disabled={loading.pending}/>
                        <button class="w-full py-3 px-6 text-center font-semibold text-white rounded-lg bg-blue-500" type="submit" disabled={loading.pending}>
                            조회하기
                        </button>
                        <Show when={loading.error}>
                            <p class="text-red-500 mt-4 text-sm">{loading.error}</p>
                        </Show>
                    </Form>
                </div>
            </div>
        </main>
    )
}