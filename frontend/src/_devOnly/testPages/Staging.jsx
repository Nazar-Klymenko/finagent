import { useFieldArray, useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Form from "@components/Form";
import { MuiButton } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { DateInput, MuiInput, MuiRadio } from "@components/input";

const Staging = () => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: { policyholder: [{ name: "", surname: "" }] },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "policyholder", // unique name for your Field Array
    }
  );
  const formSubmit = (data) => {
    console.log(data);
  };
  return (
    <ContentWrap fullHeight xl direction="column">
      <Form id="form" onSubmit={handleSubmit(formSubmit)}>
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <MuiInput
                  control={control}
                  name={`policyholder[${index}].name`}
                  labelName="name"
                  error={false}
                  helperText=""
                  autoComplete="given-name"
                  // defaultValue={policyHolders[currentlySelected]?.name}
                />
                <MuiInput
                  control={control}
                  name={`policyholder[${index}].surname`}
                  labelName="surname"
                  error={false}
                  helperText=""
                  autoComplete="given-name"
                  // defaultValue={policyHolders[currentlySelected]?.name}
                />

                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
                <button type="button" onClick={() => append(index)}>
                  Append
                </button>
              </li>
            );
          })}
        </ul>
      </Form>
      {/* <div>
        {policyholder.map((person) => (
          <span>{person.name}</span>
        ))}
      </div> */}

      <MuiButton text="Next" form="form" color="primary" />
    </ContentWrap>
  );
};

export default Staging;

// // //  {/* <FileTest
// // //           control={control}
// // //           name="files"
// // //           showFiles
// // //           error={!!errors.files}
// // //           helperText={errors?.files?.message}
// // //         /> */}

// const TaskList: React.FC<any> = ({ onComplete }) => {
//   const { control, register, handleSubmit, getValues } = useForm();
//   const { fields, append, remove } = useFieldArray({
//     control, // control props comes from useForm (optional: if you are using FormContext)
//     name: "tasks", // unique name for your Field Array
//     // keyName: "id", default to "id", you can change the key name
//   });

//   console.log(getValues());

//   const doSubmit = (data: any) => {
//     let returnData = data;
//     delete returnData["task-input"];
//     console.log("TASK DATA", returnData);
//     onComplete(returnData, false);
//   };

//   return (
//     <form onSubmit={handleSubmit(doSubmit)}>
//       <IonItem style={{ "--padding-start": 0 }}>
//         <IonLabel>OBJECTIVE NAME</IonLabel>
//         <Controller
//           render={({ onChange }) => (
//             <IonInput type="text" onIonChange={onChange} />
//           )}
//           control={control}
//           defaultValue=""
//           name="task-title"
//         />
//       </IonItem>

//       <IonCard>
//         <IonCardHeader>
//           <h4>ADD TASKS</h4>
//         </IonCardHeader>
//         <IonCardContent>
//           <IonItem style={{ "--padding-start": 0 }}>
//             <IonLabel>Sub Task</IonLabel>
//             <Controller
//               render={({ onChange }) => (
//                 <IonInput type="text" onIonChange={onChange} />
//               )}
//               control={control}
//               defaultValue=""
//               name="task-input"
//             />
//           </IonItem>
//           <IonItem lines="none" style={{ "--padding-start": 0 }}>
//             <IonButton
//               onClick={() =>
//                 append({ id: Date.now(), subTask: getValues("task-input") })
//               }
//             >
//               Add Task To Objective
//             </IonButton>
//           </IonItem>
//         </IonCardContent>
//       </IonCard>
//       <p>SUB TASKS</p>
//       {fields.map((task: any, index: number) => {
//         return (
//           <IonItem key={task.id} style={{ "--padding-start": 0 }}>
//             <IonIcon
//               icon={trashOutline}
//               onClick={() => remove(index)}
//               slot="end"
//             />
//             <input
//               type="hidden"
//               name={`tasks[${index}].id`}
//               ref={register()}
//               defaultValue={task.id}
//             />
//             <Controller
//               render={({ value, onChange }) => (
//                 <IonInput
//                   type="text"
//                   onIonChange={onChange}
//                   name={`tasks[${index}].subTask`}
//                   ref={register}
//                   value={value}
//                 />
//               )}
//               control={control}
//               defaultValue={task.subTask} // make sure to set up defaultValue
//               name={`tasks[${index}].subTask`}
//             />
//           </IonItem>
//         );
//       })}
//       <IonButton type="submit">SAVE IT ALL</IonButton>
//       <IonButton onClick={() => onComplete(null, true)} color="danger">
//         CANCEL
//       </IonButton>
//     </form>
//   );
// };
