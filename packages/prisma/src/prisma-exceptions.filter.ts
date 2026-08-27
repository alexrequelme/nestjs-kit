import { ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Response } from "express";

type PrismaErrorResponse = {
  statusCode: number;
  message: string;
};

const PRISMA_ERROR_RESPONSES: Record<string, PrismaErrorResponse> = {
  P2000: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: "The provided value is too long for the column.",
  },
  P2002: {
    statusCode: HttpStatus.CONFLICT,
    message: "Resource already exists.",
  },
  P2003: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: "Related record does not exist.",
  },
  P2014: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: "The change would violate a required relation.",
  },
  P2024: {
    statusCode: HttpStatus.SERVICE_UNAVAILABLE,
    message: "Database connection timed out.",
  },
  P2025: { statusCode: HttpStatus.NOT_FOUND, message: "Record not found." },
};

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionsFilter extends BaseExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const responseData = PRISMA_ERROR_RESPONSES[exception.code];

    if (!responseData) {
      super.catch(exception, host);
      return;
    }

    const response = host.switchToHttp().getResponse<Response>();
    response.status(responseData.statusCode).json(responseData);
  }
}
