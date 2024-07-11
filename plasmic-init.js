import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import { AuthGlobalContext } from "./components/AuthGlobalContext";
import { showNotification } from "./helpers/showNotification";
import parseName from "./helpers/parseName";
import { AppGlobalContext } from "./components/AppGlobalContext";
import parsePhoneNumber from "./helpers/parsePhoneNumber";
import formatCurrency from "./helpers/formatCurrency";
import validateEmail from "./helpers/validateEmail";
import validatePhone from "./helpers/validatePhone";
import formatDate from "./helpers/formatDate";
import validateUrl from "./helpers/validateUrl";
import updateQueryParam from "./helpers/updateQueryParam";
import parseQueryParams from "./helpers/parseQueryParams";
import getQueryParams from "./helpers/getQueryParams";
import getQueryParamsObject from "./helpers/getQueryParamsObject";

import { registerAll } from "inprodi-design-system";
import removeQueryParam from "./helpers/removeQueryParam";
import { FieldsGlobalContext } from "./components/FieldsGlobalContext";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: "rhtpiygehaYPHyZZdWmjau",
      token: "hY46OXUh6iHzbLKlv52kmZzhnnfz31uR3Nq99ByJK5EwcQsUoLqJ5vCVPunhtsWcmGHvgATxhxqI564GaYpqg",
    },
  ],
  preview: true,
});

registerAll( PLASMIC );

PLASMIC.registerFunction( showNotification, {
  name : "showNotification",
  params : [
    {
      name        : "message",
      type        : "string",
      description : "The message to show in the notification",
    },
    {
      name        : "config",
      type        : "object",
      description : "The config for the notification",
    },
  ],
});

PLASMIC.registerFunction( parseName, {
  name : "parseName",
  params : [
    {
      name        : "user",
      type        : "object",
      description : "Object including name, middleName and lastName",
    },
  ],
});

PLASMIC.registerFunction( parsePhoneNumber, {
  name : "parsePhoneNumber",
  params : [
    {
      name        : "phoneNumber",
      type        : "string",
      description : "The phone number to parse",
    },
  ],
});

PLASMIC.registerFunction( formatCurrency, {
  name : "formatCurrency",
  params : [
    {
      name        : "amount",
      type        : "number",
      description : "The amount to format",
    },
  ],
});

PLASMIC.registerFunction( validateEmail, {
  name : "validateEmail",
  params : [
    {
      name        : "email",
      type        : "string",
      description : "The email to validate",
    },
  ],
});

PLASMIC.registerFunction( validateUrl, {
  name : "validateUrl",
  params : [
    {
      name        : "url",
      type        : "string",
      description : "The url to validate",
    },
  ],
});

PLASMIC.registerFunction( validatePhone, {
  name : "validatePhone",
  params : [
    {
      name        : "phone",
      type        : "string",
      description : "The phone to validate",
    },
  ],
});

PLASMIC.registerFunction( parseQueryParams, {
  name : "parseQueryParams",
  params : [
    {
      name        : "params",
      type        : "object",
      description : "Object with the query to include to the url",
    },
    {
      name : "addToUrl",
      type : "boolean",
      description : "Whether to add the query to the url or not",
    },
  ],
});

PLASMIC.registerFunction( getQueryParams, {
  name : "getQueryParams",
  params : [],
});

PLASMIC.registerFunction( getQueryParamsObject, {
  name : "getQueryParamsObject",
  params : [],
});

PLASMIC.registerFunction( removeQueryParam, {
  name : "removeQueryParam",
  params : [
    {
      name        : "key",
      type        : "string",
      description : "The key to add",
    },
  ],
});

PLASMIC.registerFunction( updateQueryParam, {
  name : "updateQueryParam",
  params : [
    {
      name        : "key",
      type        : "string",
      description : "The key to add",
    },
    {
      name        : "value",
      type        : "string",
      description : "The value to add",
    },
  ],
});

PLASMIC.registerFunction( formatDate, {
  name : "formatDate",
  params : [
    {
      name        : "date",
      type        : "string",
      description : "The date to format",
    },
    {
      name        : "format",
      type        : "string",
      description : "The format to use",
    },
  ],
});

PLASMIC.registerGlobalContext( AuthGlobalContext, {
  name : "AuthGlobalContext",
  props : {},
  providesData : true,
  globalActions : {
    login : {
      parameters : [
        { name : "token", type : "string" },
        { name : "user", type : "object" },
      ],
    },
    update : {
      parameters : [
        { name : "user", type : "object" },
      ],
    },
    logout : {
      parameters : [],
    },
  },
});

PLASMIC.registerGlobalContext( AppGlobalContext, {
  name : "AppGlobalContext",
  props : {},
  providesData : true,
  globalActions : {
    setApp : {
      parameters : [
        { name : "selection", type : "string" },
      ],
    },
  },
});

PLASMIC.registerGlobalContext( FieldsGlobalContext, {
  name : "FieldsGlobalContext",
  props : {},
  providesData : true,
  globalActions : {
    setFields : {
      parameters : [
        { name : "app", type : "string" },
        { name : "module", type : "string" },
        { name : "newFields", type : "object" },
      ],
    },
  },
});