/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 30/10/16
 * Licence: See Readme
 */

import _ from "lodash";
import React, { useCallback, useRef, useState } from "react";
import { JsonTree } from "../../src/JsonTree";
import { trySetRefAttr } from "../utils/misc";

const defaultJson = {
  error: new Error("error"),
  func: () => {
    // eslint-disable-next-line no-console
    console.log("test");
  },
  text: "text",
  int: 100,
  boolean: true,
  null: null,
  // eslint-disable-next-line object-shorthand
  undefined: undefined,
  object: {
    text: "text",
    int: 100,
    boolean: true,
  },
  array: [1, 2, 3, { string: "test" }],
};

type ReadOnlyCallback = (
  name: string,
  value: unknown,
  keyPath: string
) => boolean;

function Body() {
  const [json, setJson] = useState(_.cloneDeep(defaultJson));
  const [deltaUpdateString, setDeltaUpdateString] = useState("{}");
  const [readOnly, setReadOnly] = useState<boolean | ReadOnlyCallback>(false);
  const [globalUpdateString, setGlobalUpdateString] = useState("{}");
  const [customInput, setCustomInput] = useState(false);
  const [minusMenu, setMinusMenu] = useState(false);

  const [readOnlyEnable, setReadOnlyEnable] = useState(false);
  const [readOnlyFunctionEnable, setReadOnlyFunctionEnable] = useState(false);
  const [readOnlyBooleanEnable, setReadOnlyBooleanEnable] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const readOnlyBooleanRef = useRef<HTMLInputElement | null>(null);
  const readOnlyFunctionRef = useRef<HTMLInputElement | null>(null);
  const readOnlyRef = useRef<HTMLInputElement | null>(null);
  const customInputRef = useRef<HTMLInputElement | null>(null);
  const minusMenuRef = useRef<HTMLInputElement | null>(null);

  const onFullyUpdate = useCallback((newJson: object) => {
    setGlobalUpdateString(JSON.stringify(newJson, null, 4));
  }, []);

  const onDeltaUpdate = useCallback((deltaUpdate: object) => {
    setDeltaUpdateString(JSON.stringify(deltaUpdate, null, 4));
  }, []);

  const handleChangeMinusMenu = useCallback(() => {
    setMinusMenu(minusMenuRef.current?.checked ?? false);
  }, []);

  const handleChangeCustomInput = useCallback(() => {
    setCustomInput(customInputRef.current?.checked ?? false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!textareaRef.current) return;

    const jsonString = textareaRef.current.value;
    if (!jsonString) return;

    try {
      setJson(JSON.parse(jsonString));
    } catch (e) {
      // Nothing
      // eslint-disable-next-line no-console
      console.error(e);
      return;
    }
    // Reset value
    textareaRef.current.value = "";
  }, []);

  const handleResetToDefault = useCallback(() => {
    setJson(_.cloneDeep(defaultJson));
  }, []);

  const handleChangeReadOnlyBoolean = useCallback(() => {
    trySetRefAttr(readOnlyFunctionRef, {
      disabled: readOnlyBooleanRef.current?.checked ?? false,
    });
    setReadOnly(
      (prevState: any) => readOnlyBooleanRef.current?.checked ?? prevState
    );
  }, []);

  const handleChangeReadOnlyFunction = useCallback(() => {
    trySetRefAttr(readOnlyBooleanRef, {
      disabled: readOnlyFunctionRef.current?.checked ?? false,
    });

    let result: ReadOnlyCallback;
    if (readOnlyFunctionRef.current?.checked) {
      result = (name, value, keyPath) => keyPath[keyPath.length - 1] === "text";
    } else {
      result = () => false;
    }

    setReadOnly(result);
  }, []);

  const handleChangeReadOnly = useCallback(() => {
    const checkbox = readOnlyRef.current;
    if (!checkbox) return;
    setReadOnlyEnable(checkbox.checked);

    if (checkbox.checked) {
      trySetRefAttr(readOnlyBooleanRef, { disabled: false });
      trySetRefAttr(readOnlyFunctionRef, { disabled: false });
      if (readOnlyBooleanRef.current?.checked) {
        handleChangeReadOnlyBoolean();
      } else if (readOnlyFunctionRef.current?.checked) {
        handleChangeReadOnlyFunction();
      }
    } else {
      trySetRefAttr(readOnlyBooleanRef, { disabled: true });
      trySetRefAttr(readOnlyFunctionRef, { disabled: true });
      setReadOnly(false);
    }
  }, []);

  const handleClearGlobalUpdateString = useCallback(() => {
    setGlobalUpdateString("{}");
  }, []);

  const handleClearDeltaUpdateString = useCallback(() => {
    setDeltaUpdateString("{}");
  }, []);

  // Render

  const style1 = {
    width: "100%",
  };
  const style2 = {
    verticalAlign: "top",
  };
  const style3 = {
    backgroundColor: "#e0e0e0",
    border: "1px lightgrey solid",
  };
  const style4 = {
    margin: "0 15px",
    minWidth: "200px",
  };
  const style5 = {
    backgroundColor: "black",
    color: "yellow",
    border: "1px solid green",
  };
  const customInputElement = customInput ? <input style={style5} /> : undefined;
  const minusMenuElement = minusMenu ? (
    <button type="button">Remove</button>
  ) : undefined;

  return (
    <div>
      <div style={style4}>
        <span>
          <input
            type="checkbox"
            ref={readOnlyRef}
            onChange={handleChangeReadOnly}
          />
          Read Only
        </span>
        <span>
          <input
            type="checkbox"
            ref={readOnlyBooleanRef}
            onChange={handleChangeReadOnlyBoolean}
            disabled
          />
          Read Only Boolean
        </span>
        <span>
          <input
            type="checkbox"
            ref={readOnlyFunctionRef}
            onChange={handleChangeReadOnlyFunction}
            disabled
          />
          Read Only Function (read only for all &apos;text&apos; key)
        </span>
        <span>
          <input
            type="checkbox"
            ref={customInputRef}
            onChange={handleChangeCustomInput}
          />
          Custom input
        </span>
        <span>
          <input
            type="checkbox"
            ref={minusMenuRef}
            onChange={handleChangeMinusMenu}
          />
          Custom minus menu
        </span>
      </div>
      <table style={style1}>
        <thead>
          <tr>
            <th>
              <span>Result</span>
            </th>
            <th>
              <span>
                Global Update{" "}
                <button type="button" onClick={handleClearGlobalUpdateString}>
                  Clear
                </button>
              </span>
            </th>
            <th>
              <span>
                Delta Update{" "}
                <button type="button" onClick={handleClearDeltaUpdateString}>
                  Clear
                </button>
              </span>
            </th>
            <th>
              <span>Put Your Json</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={style2}>
              <div style={style4}>
                <JsonTree
                  data={json}
                  onFullyUpdate={onFullyUpdate}
                  onDeltaUpdate={onDeltaUpdate}
                  readOnly={readOnly}
                  inputElement={customInputElement}
                  minusMenuElement={minusMenuElement}
                  logger={console}
                />
              </div>
            </td>
            <td style={style2}>
              <div style={style4}>
                <pre style={style3}>{globalUpdateString}</pre>
              </div>
            </td>
            <td style={style2}>
              <div style={style4}>
                <pre style={style3}>{deltaUpdateString}</pre>
              </div>
            </td>
            <td style={style2}>
              <div style={style4}>
                <textarea ref={textareaRef} rows={15} cols={40} />
                <div>
                  <button type="button" onClick={handleSubmit}>
                    Submit
                  </button>
                  <button type="button" onClick={handleResetToDefault}>
                    Default
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Body;
