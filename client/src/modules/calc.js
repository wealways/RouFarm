// target(string) - "20210514"
export function calcDuringDay(target) {
  // 0. 이 전의 데이터(해당 컬럼 없을 때)
  if (target == null) {
    return 0
  } else {
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
}

// 잔디 보여줄 형식 변경
export function manipulateMonthInfo(Month) {
  // console.log(Month)
  // console.log('parameter')
  // 0. 현재 월 추출하기
  const today = new Date()
  const year = String(today.getFullYear())
  // 1월 => 0
  // 한자리 수 월에는 0 붙여주기
  const month = String(today.getMonth() + 1).padStart(2, '0')
  // const month = '03'

  const currentMonth = [year, month].join('-')

  // console.log(Month[currentMonth])

  const newDateInfo = {}
  // 1. 날짜(key), 숫자(value) 형식으로 변환
  for (const i in Month[currentMonth]) {
    // 1 - 1. 키값 형식 맞게 생성
    let key = currentMonth + '-' + String(Number(i) + 1).padStart(2, '0')
    // 1-2. 숫자를 색상코드로 변환
    let val = Month[currentMonth][i]

    // 조건문
    // let temp = val >= 100 ? '#216e39' : val >= 50 ? '#30a14e' : val > 0 ? '#9be9a8' : val == 0 ? '#ff0101' : val == -1 ? '#ebedf0' : '#fff'

    let temp = val >= 100 ? '#216e39' : val >= 50 ? '#ced730' : val > 0 ? '#e1e5a6' : val == 0 ? '#d4003d' : val == -1 ? '#e2e0d8' : '#fff'
    // 1-3. key: value 형식으로 저장
    newDateInfo[key] = [temp]
  }
  // 2. 오늘날짜 넣어주기
  const now = [year, month, String(today.getDate()).padStart(2, '0')].join('-')
  // 3. 이번 달 정보 넣어주기
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const monthName = monthNames[Number(month) - 1]

  // 최종 객체 반환
  const result = {
    title: monthName + ' ' + year,
    today: now,
    info: newDateInfo,
  }

  return result
}