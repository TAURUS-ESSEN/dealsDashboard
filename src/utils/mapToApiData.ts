import type { Client, ClientToSave, NewClientToSave } from "../types/client";
import type { Deal, DealToSave, NewDealToSave, NewDealFormState, DealWithClientToSave } from "../types/deals";
import type { Task, TaskToSave } from "../types/tasks";
import { nanoid } from "nanoid";
import { User, UserToSave, NewUserToSave, EmptyUser } from "../types/users";

export const mapClientToSaveData = (client: Client): ClientToSave => {
  const { issues, meta, ...rest } = client;
  const clientToApi: ClientToSave = {
    ...rest,
    clientKey: rest.clientKey ?? "",
    ownerKey: rest.ownerKey ?? "",
    createdAt: rest.createdAt ?? "",
    lastContactAt: rest.lastContactAt ?? "",
    email: rest.email ?? meta.rawEmail ?? "",
    tags: rest.tags.join(","),
  };
  return clientToApi;
};

export const mapDealToSaveData = (deal: Deal): DealToSave => {
  const { issues, meta, ...rest } = deal;
  const dealToApi: DealToSave = {
    ...rest,
    clientKey: rest.clientKey ?? "",
    value: String(rest.value),
    probability: String(rest.probability),
    ownerKey: rest.ownerKey ?? "",
    createdAt: rest.createdAt ?? "",
    expectedCloseDate: rest.expectedCloseDate ?? "",
    updatedAt: rest.updatedAt ?? "",
  };
  return dealToApi;
};

export const mapNewDealToSaveData = (deal: NewDealFormState): NewDealToSave => {
  const { clientType, ...rest } = deal;
  //  deal.clientKey = `cl_${nanoid(8)}`;
  // }
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

export const mapTaskToSaveData = (task: Task): TaskToSave => {
  const { issues, meta, ...rest } = task;
  const taskToApi: TaskToSave = {
    ...rest,
    taskKey: rest.taskKey ?? "",
    clientKey: rest.clientKey ?? "",
    dealKey: rest.dealKey ?? "",
    assigneeKey: rest.assigneeKey ?? "",
    title: rest.title ?? "",
    status: rest.status ?? "",
    priority: rest.priority ?? "",
    dueDate: rest.dueDate ?? "",
    createdAt: rest.createdAt ?? "",
  };
  return taskToApi;
};

export const mapUserToSaveData = (user: User): UserToSave => {
  const { issues, ...rest } = user;
  const userToSave: UserToSave = {
    ...rest,
    userKey: rest.userKey ?? "",
    fullName: rest.fullName ?? "",
    role: rest.role ?? "",
    email: rest.email ?? "",
    avatarUrl: rest.avatarUrl ?? "",
    active: String(rest.active),
  };
  return userToSave;
};

export const mapNewUserToSaveData = (user: EmptyUser): NewUserToSave => {
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
