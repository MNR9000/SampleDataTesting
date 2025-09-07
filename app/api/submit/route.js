import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title, location,size,price,description,propertyTypedescription } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { message: 'Title and description are required'},
        { status: 400 }
      );
    }

    const token = process.env.GITHUB_TOKEN;
    const repo = 'MNR9000/SampleDataTesting'; // your repo
    const filePath = 'data/listing.json';

    // Step 1: Get current content
    const fileResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'form-submitter',
        },
      }
    );

    if (!fileResponse.ok) {
      return NextResponse.json(
        { message: `Failed to fetch file from GitHub` },
        { status: 500 }
      );
    }

    const fileData = await fileResponse.json();
    const sha = fileData.sha;

    // Step 2: Decode existing content
    let decodedContent = []
    try{
      decodedContent = JSON.parse(
      Buffer.from(fileData.content, 'base64').toString('utf-8')
    );
  }
  catch(err){
    decodedContent = [];
  }

    // Step 3: Append new entry
    const newEntry = {
      title,
      location,
      size,
      price,
      description,
      propertyTypedescription,
      timestamp: new Date().toISOString(),
    };
    decodedContent.push(newEntry);

    // Step 4: Encode new content
    const updatedContent = Buffer.from(
      JSON.stringify(decodedContent, null, 2)
    ).toString("base64");

    // Step 5: Commit updated content back to GitHub
    const commitResponse = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add new entry: ${title}`,
          content: updatedContent,
          sha,
        }),
      }
    );

    if (!commitResponse.ok) {
      return NextResponse.json(
        { message: `Failed to commit changes to GitHub`},
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Submitted and committed successfully!" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}