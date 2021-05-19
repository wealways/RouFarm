// target(string) - "20210514"
export function calcDuringDay(target) {
  // 1. 문자열 잘라서 가져오기(start, length)
  const year = target.substr(0, 4)
  const month = target.substr(4, 2)
  const day = target.substr(6, 2)

  // 2.문자열 붙여주기
  const targetDate = [year, month, day].join('-')

  // 3. 잘라진 문자열로 Date 인스턴스 생성
  const signInDate = new Date(targetDate)

  // 3. 현재 시간과 차이 계산
  const nowDate = new Date();

  const duringMileSec = nowDate.getTime() - signInDate.getTime()
  // 4. 일자로 변환 초=> 분 => 시
  const duringDay = duringMileSec / 1000 / 60 / 60 / 24

  // 5. 올림해서 반환(00일 째니까)
  return Math.ceil(duringDay)
}
