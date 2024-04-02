import {
    Form,
    useLoaderData,
    redirect,
    useNavigate,
  } from "react-router-dom";
  import { updateContact, deleteContact } from "../contacts";

export async function action({ request, params }) {
    const formData = await request.formData();
    const firstName = formData.get("first");
    const lastName = formData.get("last");
    const full = firstName + " " + lastName;
    formData.append('full', full);
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>이름</span>
        <input
          placeholder="성"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="이름"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </p>
      <label>
        <span>트위터</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>아바타 URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>소개글</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">저장</button>
        <button 
            type="button"
             onClick={() => {
                async function action(params) {
                    await deleteContact(params.id);
                    window.location.href = "http://localhost:3000";
                }
                console.log(contact);
                if(contact.first == undefined || contact.last == undefined) {
                    action(contact);
                }
                navigate(-1);
            }}
        >
            취소
        </button>
      </p>
    </Form>
  );
}