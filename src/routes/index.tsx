export default function Home() {
  return (
    <main class="bg-gray-100">
      <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white rounded-lg p-10 shadow-md">
          <h1 class="text-3xl font-bold mb-6">고사장 통합 조회 시스템</h1>
          <div class="space-y-6">
            <a href="/personal_code"
              class="block w-full py-3 px-6 text-center font-semibold text-white rounded-lg gradient">개인번호로 조회하기</a>
            <a href="/intranet"
              class="block w-full py-3 px-6 text-center font-semibold text-white rounded-lg gradient">인트라넷 계정으로 조회하기</a>
          </div>
        </div>
      </div>
    </main>
  );
}
