import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ExamRoom {
    code: string;
    subject: string;
    date: string;
    period: number;
    room: string;
};

const code = "STU-MIGI";


await prisma.examroom.create({
    data: generateRandomExamRoomData(code),
})

const count = await prisma.examroom.count();
console.log(`There are ${count} data in the database.`);

function generateRandomSubjectName() {
    const subjects = [
        "국어",
        "수학",
        "영어",
        "한국사",
        "통합사회",
        "통합과학",
        "체육",
        "음악",
        "미술",
        "기술·가정",
        "제2외국어",
        "한문",
        "교양",
        "심화 수학 I",
        "심화 수학 Ⅱ",
        "고급 수학 I",
        "고급 수학 Ⅱ",
        "고급 물리학",
        "고급 화학",
        "고급 생명과학",
        "고급 지구과학",
        "물리학 실험",
        "화학 실험",
        "생명과학 실험",
        "지구과학 실험",
        "정보과학",
        "융합 과학탐구",
        "과학과제 연구",
        "생태와 환경",
        "스포츠 개론",
        "체육과 진로 탐구",
        "체육 지도법",
        "육상운동",
        "체조 운동",
        "수상 운동",
        "개인·대인 운동",
        "음악이론",
        "음악사",
        "시창·청음",
        "음악 전공 실기",
        "합창",
        "합주",
        "공연실습",
        "미술 이론",
        "미술사",
        "드로잉",
        "심화 영어 회화 I",
        "심화 영어 회화 Ⅱ",
        "심화 영어 I",
        "심화 영어 Ⅱ",
        "심화 영어 독해 I",
        "전공 기초 독일어",
        "국제정치",
        "국제경제",
        "국제법",
        "지역 이해",
        "한국 사회의 이해",
        "비교문화",
        "세계 문제와 미래사회",
        "국제 관계와 국제 기구",
        "현대 세계의 변화",
        "사회 탐구방법",
        "사회과제 연구"
      ];      
    const randomIndex = Math.floor(Math.random() * subjects.length);
    return subjects[randomIndex];
}

function generateRandomDate() {
    const year = Math.floor(Math.random() * (2023 - 1900 + 1)) + 1900;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}년 ${month}월 ${day}일`;
}

function generateRandomPeriod() {
    // 1~5
    return Math.floor(Math.random() * 5) + 1;
}

function generateRandomRoom() {
    // ABC-1234
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}${letters[Math.floor(Math.random() * letters.length)]}-${randomNumber}`;
}

function generateRandomExamRoomData(code_a: string) {

    const code = code_a;
    const subject = generateRandomSubjectName();
    const date = generateRandomDate();
    const period = generateRandomPeriod();
    const room = `Room ${generateRandomRoom()}`;

    return { code, subject, date, period, room };
}
