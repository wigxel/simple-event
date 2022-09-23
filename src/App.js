import "./App.css";
import React, { useState } from "react";
import * as yup from "yup";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getJSONorDefault } from "./libs/localstore";
import cuid from "cuid";

const schema = yup.object().shape({
  eventTitle: yup
    .string()
    .min(7, "Title too short")
    .required("Please provide a title"),
  venue: yup.string().required(),
  time: yup.date().required(),
  // speakers: yup.object().shape({
  // })
});

const offline = true;
function App() {
  const previous = React.useRef({
    eventTitle: "eg. The Grace place event centre",
  }).current;
  const defaultValues = getJSONorDefault(previous)("formData");

  const form = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  console.log(defaultValues, form.getValues());
  const [speakers, setSpeakers] = useState([cuid()]);

  const addNewSpeaker = () => setSpeakers([...speakers, cuid()]);

  const removeSpeaker = (id) => {
    const filtered = speakers.filter((id_) => id_ !== id);
    setSpeakers(filtered);
    form.unregister(`speakers.${id}`);
  };

  const createAnEvent = () => {
    console.log("Creating an event");
  };

  return (
    <div className="App">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((formData) => {
            debugger;
            if (offline) localStorage["formData"] = JSON.stringify(formData);
            else createAnEvent();
          })}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 300,
            padding: 18,
            border: "solid 1px gray",
          }}
        >
          <h3>Add new Events</h3>

          <input
            {...form.register("eventTitle")}
            type="text"
            placeholder="Event title"
          />
          <ErrorMessage name={"eventTitle"} />

          <textarea
            {...form.register("venue")}
            type="text"
            placeholder="Event venue"
          ></textarea>
          <ErrorMessage name={"venue"} />

          <input {...form.register("time")} type="date" />
          <ErrorMessage name={"time"} />

          {speakers.map((uniqueStr, index) => {
            return (
              <div
                key={uniqueStr}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 8,
                  marginBottom: 4,
                }}
              >
                <label style={{ textAlign: "left" }}>
                  {"Speaker" + (index + 1)}
                </label>
                <div style={{ display: "flex", gap: 5 }}>
                  {["name", "title"].map((field) => {
                    const fieldName = `speakers.${uniqueStr}.${field}`;

                    return (
                      <React.Fragment key={fieldName}>
                        <input
                          key={uniqueStr}
                          type="text"
                          placeholder={field}
                          {...form.register(fieldName)}
                        />
                        <ErrorMessage name={fieldName} />
                      </React.Fragment>
                    );
                  })}
                  <button onClick={() => removeSpeaker(uniqueStr)}>
                    REMOVE
                  </button>
                </div>
              </div>
            );
          })}

          <button type="button" onClick={addNewSpeaker}>
            Add another
          </button>

          <br />
          <br />
          <br />
          <button>Add Event</button>
        </form>
      </FormProvider>
    </div>
  );
}

export const ErrorMessage = ({ name }) => {
  const { formState } = useFormContext();

  return (
    <span
      className={"text-[13px] text-red-600 first-letter:uppercase"}
      style={{ color: "red", fontSize: 13 }}
    >
      {formState.errors?.[name]?.message}
    </span>
  );
};

export default App;
