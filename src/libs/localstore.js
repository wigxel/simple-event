// import S from "sanctuary";

// A Form adding events

export const getJSONorDefault = (default_) => (key) => {
  try {
    const payload = localStorage.getItem(key); // null
    if (payload === null) return default_;
    return JSON.parse(payload);
  } catch (err) {
    return default_;
  }
};

export const getJSONFromLS = getJSONorDefault({});

// export function getArrayFromLS(key) {
//   const data = getJSONFromLS(key);
//   if (Array.isArray(data)) return S.Just(data); // Either
//   return {};
// }

// export function getFromLS(key) {
//   const payload = localStorage.getItem(key); // null
//   if (typeof payload === "string") return S.Just(payload);

//   return S.Nothing; // .map .chain
// }

// const maybe = getFromLS("validKey"); // Maybe(data) || Maybe()
// const localPayload = {
//   a: {
//     b: {
//       name: "30", // Something
//     },
//     c: {
//       age: 30, // Nothing
//     },
//   },
// };

// localPayload.a.b + localPayload.a.c => "30" + 30 => "3030"
// localPayload.a.b + localPayload.a.c => undefined + 30 => 30;
// localPayload.a.b + localPayload.a.c => "30" + O => "30O"

// Maybe =>  Nothing(wrong) | Just(correct)
// Either => Left(wrong) | Right(correct)

// Maybe =>  Nothing | Just(11)
// Either => Left(10) | Right(true)

// localPayload.a.b + localPayload.a.c => "30" + 30 => Just("3030") | Right("3030")
// localPayload.a.b + localPayload.a.c => undefined + 30 => Nothing | Left(30)
// localPayload.a.b + localPayload.a.c => "30" + O => Nothing | Left("30O")

// maybe
//   .map((data) => {
//     // process1
//     // Nothing + Something => Nothing
//     // Something + Something => Something
//     // Nothing + Nothing => Nothing
//     return R.lift2(process3)(process1(data))(process2(data)); // Nothing + Something
//   })
//   .map(console.log); // console.log(Something.value) ||

// const data = getFromLS("validKey"); // Maybe(data) || Maybe()
// if (data !== null) {
//   const p1data = process1(data);
//   if (p1data === null) throw new Error("Process1 data is invalid");

//   const p2data = process2(data);
//   if (data === null) throw new Error("Process2 data is invalid");

//   process3(p2data);
// }

// oldPromise.then(() => newPromise).then(newPromisePayload => {}).catch(() => {})

// data => process1 => correct => process2 => correct => process3
//                  => wrong   =>             wrong =>

// Maybe (Something | Nothing)
//      Something => Maybe('hello') => { value: 'hello', ... }
//      Nothing => Maybe() => { value: '', ... }
// S.Just => Maybe Monads
// S.Nothing => Maybe Monads
