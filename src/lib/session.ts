// session.ts

import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { SessionPayload } from "@/_domain/shared/types";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("A variável de ambiente SESSION_SECRET não está definida.");
}
const encoder = new TextEncoder();
const encodedKey = encoder.encode(secretKey);

/**
 * Encripta o payload da sessão usando JWT.
 * @param payload Dados da sessão do usuário.
 * @returns Token JWT encriptado.
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("7d") // Define a expiração para 7 dias
    .sign(encodedKey);
}

/**
 * Decripta e verifica o token JWT da sessão.
 * @param token Token JWT da sessão.
 * @returns Payload da sessão ou null se inválido.
 */
export async function decrypt(
  token: string | undefined = ""
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as SessionPayload;
  } catch (error) {
    console.log("Falha ao verificar a sessão:", error);
    return null;
  }
}

/**
 * Cria uma nova sessão para o usuário.
 * @param user Dados do usuário para a sessão.
 */
export async function createSession(token: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookie = await cookies();
  cookie.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Obtém a sessão atual do usuário.
 * @returns Dados da sessão ou null se não existir ou inválida.
 */
export async function getSession(): Promise<SessionPayload | null> {
  const cookie = await cookies();
  const sessionCookie = cookie.get("session")?.value;
  if (!sessionCookie) return null;

  const session = await decrypt(sessionCookie);
  return session;
}

/**
 * Update Session
 */
export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const newToken = await encrypt(payload);
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Delete Session
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
