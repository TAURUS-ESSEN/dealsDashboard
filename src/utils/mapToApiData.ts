import type {
  Client,
  ClientFormState,
  ClientToSave,
  NewClientToSave,
  ClientSubmitData,
} from "../types/client";
import type {
  Deal,
  DealToSave,
  NewDealToSave,
  NewDealFormState,
  DealWithClientToSave,
  EditDealFormState,
  EditDealSubmit,
} from "../types/deals";
import type { Task, TaskToSave, TaskSubmitFormData, TaskFormState } from "../types/tasks";
import { nanoid } from "nanoid";
import { User, UserToSave, NewUserToSave, UserSubmitData, UserFormState } from "../types/users";
import { email } from "zod";

export const mapClientToSaveData = (client: ClientSubmitData): ClientToSave => {
  // const { issues, meta, ...rest } = client;
  const clientToApi: ClientToSave = {
    ...client,
    clientKey: client.clientKey ?? "",
    ownerKey: client.ownerKey ?? "",
    createdAt: client.createdAt ?? "",
    lastContactAt: client.lastContactAt ?? "",
    email: client.email ?? "",
    tags: client.tags.join(","),
  };
  return clientToApi;
};

export const mapDealToSaveData = (deal: EditDealSubmit): DealToSave => {
  const dealToApi: DealToSave = {
    ...deal,
    clientKey: deal.clientKey ?? "",
    value: String(deal.value),
    probability: String(deal.probability),
    ownerKey: deal.ownerKey ?? "",
    createdAt: deal.createdAt ?? "",
    expectedCloseDate: deal.expectedCloseDate ?? "",
    updatedAt: deal.updatedAt ?? "",
  };
  return dealToApi;
};

export const mapNewDealToSaveData = (deal: NewDealFormState): NewDealToSave => {
  const { clientType, ...rest } = deal;
  deal.dealKey = `deal_${nanoid(8)}`;
  deal.createdAt = new Date().toISOString().slice(0, 10);
  deal.updatedAt = null;

  const dealToApi: NewDealToSave = {
    ...rest,
    dealKey: deal.dealKey,
    clientKey: deal.clientKey ?? "",
    value: String(deal.value),
    probability: String(deal.probability),
    ownerKey: deal.ownerKey ?? "",
    createdAt: deal.createdAt ?? "",
    expectedCloseDate: deal.expectedCloseDate ?? "",
    updatedAt: deal.updatedAt ?? "",
  };
  return dealToApi;
};

export const mapNewDealWithClientToSaveData = (deal: NewDealFormState): DealWithClientToSave => {
  deal.clientKey = `cl_${nanoid(8)}`;
  deal.dealKey = `deal_${nanoid(8)}`;
  deal.createdAt = new Date().toISOString().slice(0, 10);
  deal.updatedAt = null;
  deal.lastContactAt = "";
  deal.tags = "";

  const newClient: NewClientToSave = {
    clientKey: deal.clientKey,
    company: deal.company ?? "",
    industry: deal.industry ?? "",
    status: deal.status ?? "",
    email: deal.email ?? "",
    phone: deal.phone ?? "",
    ownerKey: deal.ownerKey ?? "",
    createdAt: deal.createdAt ?? "",
    lastContactAt: deal.lastContactAt ?? "",
    tags: deal.tags ?? "",
    notes: deal.notes ?? "",
  };

  const newDeal: NewDealToSave = {
    dealKey: deal.dealKey,
    clientKey: deal.clientKey,
    ownerKey: deal.ownerKey ?? "",
    title: deal.title ?? "",
    stage: deal.stage ?? "",
    value: String(deal.value) ?? "",
    probability: String(deal.probability),
    createdAt: deal.createdAt ?? "",
    expectedCloseDate: deal.expectedCloseDate ?? "",
    updatedAt: deal.updatedAt ?? "",
    description: deal.description ?? "",
  };
  return {
    newClient,
    newDeal,
  };
};

export const mapTaskToSaveData = (task: TaskSubmitFormData): TaskToSave => {
  // const { issues, meta, ...rest } = task;
  const taskToApi: TaskToSave = {
    ...task,
    taskKey: task.taskKey ?? "",
    clientKey: task.clientKey ?? "",
    dealKey: task.dealKey ?? "",
    assigneeKey: task.assigneeKey ?? "",
    title: task.title ?? "",
    status: task.status ?? "",
    priority: task.priority ?? "",
    dueDate: task.dueDate ?? "",
    createdAt: task.createdAt ?? "",
  };
  return taskToApi;
};

export const mapUserToSaveData = (user: UserSubmitData): UserToSave => {
  const userToSave: UserToSave = {
    ...user,
    userKey: user.userKey ?? "",
    fullName: user.fullName ?? "",
    role: user.role ?? "",
    email: user.email ?? "",
    avatarUrl: user.avatarUrl ?? "",
    active: String(user.active),
  };
  return userToSave;
};

export const mapNewUserToSaveData = (user: UserSubmitData): NewUserToSave => {
  const userKey = `usr_${nanoid(8)}`;
  const newUserToSave: NewUserToSave = {
    userKey,
    fullName: user.fullName ?? "",
    role: user.role ?? "",
    email: user.email ?? "",
    avatarUrl: user.avatarUrl ?? "",
    active: String(user.active),
  };
  return newUserToSave;
};

export const mapUserToFormState = (user: User): UserFormState => ({
  fullName: user.fullName,
  role: user.role,
  email: user.email ?? "",
  active: user.active,
});

export const mapTaskToFormState = (task: Task): TaskFormState => ({
  title: task.title,
  priority: task.priority,
  status: task.status,
  dueDate: task.dueDate ?? "",
});

export const mapDealToFormState = (deal: Deal): EditDealFormState => ({
  title: deal.title,
  ownerKey: deal.ownerKey,
  stage: deal.stage,
  value: deal.value,
  probability: deal.probability,
  expectedCloseDate: deal.expectedCloseDate ?? "",
  description: deal.description,
});

export const mapClientToFormState = (client: Client): ClientFormState => ({
  company: client.company,
  industry: client.industry,
  status: client.status,
  email: client.email ?? "",
  phone: client.phone,
  lastContactAt: client.lastContactAt ?? "",
  notes: client.notes,
});
